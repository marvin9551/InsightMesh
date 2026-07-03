"""Research-related API endpoints with SSE streaming."""

from __future__ import annotations

import asyncio
import json
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth import get_current_user, get_optional_user
from app.database import get_db
from app.models import AgentState as AgentStateModel
from app.models import LogEntry as LogEntryModel
from app.models import Report as ReportModel
from app.models import Research as ResearchModel
from app.models import User
from app.schemas import CreateResearchRequest

router = APIRouter()


# ── CRUD ─────────────────────────────────────────────────────────────────────

@router.get("/")
async def list_all_researches(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """列出当前用户的所有调研任务。"""
    result = await db.execute(
        select(ResearchModel).where(ResearchModel.user_id == user.id).order_by(ResearchModel.created_at.desc())
    )
    items = result.scalars().all()
    return [_research_to_dict(r) for r in items]


@router.post("/")
async def create_new_research(
    payload: CreateResearchRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """创建新的调研任务。"""
    research = ResearchModel(
        user_id=user.id,
        topic=payload.topic,
        description=payload.description,
        dimensions=payload.dimensions,
        depth=payload.depth.value,
        formats=payload.formats,
    )
    db.add(research)
    await db.commit()
    await db.refresh(research)

    # Create default agent states
    for agent in _default_agents(research.id):
        db.add(agent)
    await db.commit()

    return _research_to_dict(research)


@router.get("/{rid}")
async def get_research_detail(
    rid: str,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """获取单个调研任务详情。"""
    r = await _get_user_research(db, rid, user.id)
    agents_result = await db.execute(
        select(AgentStateModel).where(AgentStateModel.research_id == rid)
    )
    logs_result = await db.execute(
        select(LogEntryModel).where(LogEntryModel.research_id == rid).order_by(LogEntryModel.id)
    )
    agents = agents_result.scalars().all()
    logs = logs_result.scalars().all()
    d = _research_to_dict(r)
    d["agents"] = [
        {"id": a.agent_id, "name": a.name, "status": a.status, "hint": a.hint,
         "progress": a.progress, "icon_color": a.icon_color, "result_summary": a.result_summary}
        for a in agents
    ]
    d["logs"] = [
        {"timestamp": l.timestamp, "agent_id": l.agent_id, "agent_name": l.agent_name,
         "message": l.message, "level": l.level}
        for l in logs
    ]
    return d


@router.delete("/{rid}")
async def cancel_research(
    rid: str,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """取消调研任务。"""
    r = await _get_user_research(db, rid, user.id)
    r.status = "failed"
    await db.commit()
    return {"ok": True, "message": "任务已取消"}


# ── SSE Execution Stream ─────────────────────────────────────────────────────

_AGENT_SCRIPT = [
    ("a1", "采集", "blue", 0.3, "启动全网检索，覆盖 247 个数据源", "启动全网检索，覆盖 247 个数据源", "info", 0.05),
    ("a1", "采集", "blue", 0.8, "正在检索资讯类数据源…", "检索到 183 条相关资讯 · 36氪、虎嗅、极客公园", "success", 0.15),
    ("a1", "采集", "blue", 0.6, "正在检索行业研报…", "检索到 41 篇行业研报 · IDC、Gartner、艾瑞", "success", 0.25),
    ("a1", "采集", "blue", 0.5, "正在检索学术论文…", "检索到 23 篇学术论文 · arXiv、ACL、NeurIPS", "success", 0.35),
    ("a1", "采集", "blue", 0.3, "信息采集完成", "采集完成，共 247 条原始数据", "success", 0.40),
    ("a2", "核验", "violet", 0.3, "开始交叉比对 183 条数据", "开始交叉比对 183 条数据", "info", 0.42),
    ("a2", "核验", "violet", 0.7, "正在识别矛盾信息…", "识别 12 条矛盾信息，已标记低可信度", "warning", 0.50),
    ("a2", "核验", "violet", 0.6, "市场规模数据交叉验证中…", "市场规模数据交叉验证通过 · 可信度 96.2%", "success", 0.58),
    ("a2", "核验", "violet", 0.5, "竞争格局数据验证中…", "竞争格局数据交叉验证通过 · 可信度 91.8%", "success", 0.65),
    ("a2", "核验", "violet", 0.3, "核验完成", "核验完成，综合可信度 92.4%", "success", 0.70),
    ("a3", "观点", "green", 0.3, "开始提炼主流观点与争议焦点", "开始提炼主流观点与争议焦点", "info", 0.72),
    ("a3", "观点", "green", 0.8, "正在识别共识与分歧…", "识别 5 个主流共识、3 个争议焦点", "success", 0.78),
    ("a3", "观点", "green", 0.6, "分析厂商竞争立场…", "分析厂商竞争立场：OpenAI / Anthropic / 百度 / 字节", "info", 0.83),
    ("a3", "观点", "green", 0.5, "提炼用户观点…", "提炼用户观点：社媒讨论 1,284 条", "success", 0.88),
    ("a3", "观点", "green", 0.3, "观点分析完成", "观点对比矩阵生成完毕", "success", 0.90),
    ("a4", "整合", "amber", 0.3, "开始结构化重组信息", "开始按维度重组信息流", "info", 0.91),
    ("a4", "整合", "amber", 0.6, "生成行业现状章节…", "行业现状概览章节完成", "success", 0.93),
    ("a4", "整合", "amber", 0.5, "生成核心数据章节…", "核心数据与图表章节完成", "success", 0.95),
    ("a4", "整合", "amber", 0.3, "内容整合完成", "全部 6 个章节整合完毕", "success", 0.96),
    ("a5", "报告", "rose", 0.3, "开始生成最终报告", "开始排版与图表渲染", "info", 0.97),
    ("a5", "报告", "rose", 0.5, "渲染图表与引用溯源…", "图表渲染完成，引用溯源已附加", "success", 0.99),
    ("a5", "报告", "rose", 0.3, "报告生成完成", "完整调研报告已生成，共 18 页", "success", 1.0),
]


@router.get("/{rid}/stream")
async def stream_execution(
    rid: str,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """SSE 流式推送调研执行进度。"""
    r = await _get_user_research(db, rid, user.id)

    async def event_generator():
        from app.database import async_session as session_factory

        r.status = "running"
        async with session_factory() as s:
            await s.execute(
                ResearchModel.__table__.update().where(ResearchModel.id == rid).values(status="running")
            )
            await s.commit()

        yield _sse("status", {"status": "running", "research_id": rid})

        current_agent = None
        for agent_id, agent_name, color, delay, hint, log_msg, level, progress in _AGENT_SCRIPT:
            await asyncio.sleep(delay)

            async with session_factory() as s:
                if current_agent != agent_id:
                    if current_agent:
                        await s.execute(
                            AgentStateModel.__table__.update()
                            .where(AgentStateModel.research_id == rid)
                            .where(AgentStateModel.agent_id == current_agent)
                            .values(status="completed", progress=1.0, hint="已完成")
                        )
                    current_agent = agent_id
                    await s.execute(
                        AgentStateModel.__table__.update()
                        .where(AgentStateModel.research_id == rid)
                        .where(AgentStateModel.agent_id == agent_id)
                        .values(status="running", hint=hint, progress=progress)
                    )
                else:
                    await s.execute(
                        AgentStateModel.__table__.update()
                        .where(AgentStateModel.research_id == rid)
                        .where(AgentStateModel.agent_id == agent_id)
                        .values(hint=hint, progress=progress)
                    )

                now = datetime.now().strftime("%H:%M:%S")
                log_entry = LogEntryModel(
                    research_id=rid, timestamp=now, agent_id=agent_id,
                    agent_name=agent_name, message=log_msg, level=level,
                )
                s.add(log_entry)
                await s.execute(
                    ResearchModel.__table__.update()
                    .where(ResearchModel.id == rid)
                    .values(progress=progress)
                )
                await s.commit()

            yield _sse("agent_update", {"agent_id": agent_id, "status": "running" if current_agent == agent_id else "completed", "hint": hint, "progress": progress})
            yield _sse("log", {"timestamp": now, "agent_id": agent_id, "agent_name": agent_name, "message": log_msg, "level": level})
            yield _sse("progress", {"progress": progress, "phase": _phase_name(agent_id), "estimated_remaining": _eta(progress)})

        # Final agent
        async with session_factory() as s:
            await s.execute(
                AgentStateModel.__table__.update()
                .where(AgentStateModel.research_id == rid)
                .where(AgentStateModel.agent_id == current_agent)
                .values(status="completed", progress=1.0, hint="已完成")
            )
            # Create report
            report = ReportModel(research_id=rid, topic=r.topic, sections=_demo_sections(), sources=_demo_sources())
            s.add(report)
            await s.flush()
            await s.execute(
                ResearchModel.__table__.update()
                .where(ResearchModel.id == rid)
                .values(status="completed", progress=1.0, completed_at=datetime.now(),
                        source_count=247, page_count=18, credibility=92.4, report_id=report.id)
            )
            await s.commit()
            report_id = report.id

        yield _sse("completed", {"research_id": rid, "report_id": report_id, "source_count": 247, "page_count": 18, "credibility": 92.4})

    return StreamingResponse(event_generator(), media_type="text/event-stream", headers={"Cache-Control": "no-cache", "Connection": "keep-alive", "X-Accel-Buffering": "no"})


# ── Helpers ──────────────────────────────────────────────────────────────────

async def _get_user_research(db: AsyncSession, rid: str, user_id: str) -> ResearchModel:
    result = await db.execute(
        select(ResearchModel).where(ResearchModel.id == rid, ResearchModel.user_id == user_id)
    )
    r = result.scalar_one_or_none()
    if not r:
        raise HTTPException(status_code=404, detail="调研任务不存在")
    return r


def _research_to_dict(r: ResearchModel) -> dict:
    return {
        "id": r.id, "topic": r.topic, "description": r.description,
        "status": r.status, "depth": r.depth, "dimensions": r.dimensions,
        "formats": r.formats, "progress": r.progress,
        "source_count": r.source_count, "page_count": r.page_count,
        "credibility": r.credibility, "report_id": r.report_id,
        "created_at": r.created_at.isoformat() if r.created_at else None,
        "completed_at": r.completed_at.isoformat() if r.completed_at else None,
    }


def _default_agents(research_id: str) -> list[AgentStateModel]:
    return [
        AgentStateModel(research_id=research_id, agent_id="a1", name="信息采集 Agent", status="pending", hint="等待启动…", icon_color="blue"),
        AgentStateModel(research_id=research_id, agent_id="a2", name="数据核验 Agent", status="pending", hint="等待信息采集完成…", icon_color="violet"),
        AgentStateModel(research_id=research_id, agent_id="a3", name="观点分析 Agent", status="pending", hint="等待数据核验完成…", icon_color="green"),
        AgentStateModel(research_id=research_id, agent_id="a4", name="内容整合 Agent", status="pending", hint="等待观点分析完成…", icon_color="amber"),
        AgentStateModel(research_id=research_id, agent_id="a5", name="报告生成 Agent", status="pending", hint="等待内容整合完成…", icon_color="rose"),
    ]


def _sse(event: str, data: dict) -> str:
    return f"event: {event}\ndata: {json.dumps(data, ensure_ascii=False)}\n\n"


def _phase_name(agent_id: str) -> str:
    return {"a1": "信息采集中", "a2": "数据核验中", "a3": "观点分析中", "a4": "内容整合中", "a5": "报告生成中"}.get(agent_id, "处理中")


def _eta(progress: float) -> str:
    remaining = max(0, int((1 - progress) * 180))
    m, s = divmod(remaining, 60)
    return f"~{m}:{s:02d}"


def _demo_sections() -> list[dict]:
    return [
        {"id": "s1", "number": "01", "title": "行业现状概览", "content": "2026 年，AI Agent 行业正式从「技术验证期」迈入「规模化落地期」。全球 AI Agent 市场规模在 2026 年预计达到 287 亿美元，同比增长 68.3%。"},
        {"id": "s2", "number": "02", "title": "核心数据", "content": "AI Agent 市场在过去三年保持高速增长，2024 年突破 100 亿美元关口后持续加速。"},
        {"id": "s3", "number": "03", "title": "主流观点", "content": "共识一：Agent 是 AI 的终极形态。超过 78% 的受访技术领导者认为 Agent 将从「辅助工具」演进为「自主执行体」。"},
        {"id": "s4", "number": "04", "title": "争议点分析", "content": "垂直 Agent 的客户留存率（78%）显著高于通用 Agent（52%），但通用 Agent 的获客成本更低。"},
        {"id": "s5", "number": "05", "title": "趋势预判", "content": "短期：Agent 编排平台将成为新的基础设施层。长期：Agent 经济生态成型，市场规模有望突破 800 亿美元。"},
        {"id": "s6", "number": "06", "title": "问题与建议", "content": "Agent 的「幻觉」问题、多 Agent 协作调试工具、企业数据接入合规框架是三大关键挑战。"},
    ]


def _demo_sources() -> list[dict]:
    return [
        {"number": "01", "title": "IDC Worldwide AI Agent Forecast 2026-2028", "meta": "IDC · 2026.03", "tag": "研报"},
        {"number": "02", "title": "Gartner Market Guide for AI Agent Platforms", "meta": "Gartner · 2026.02", "tag": "研报"},
        {"number": "03", "title": "艾瑞咨询：中国 AI Agent 行业研究报告", "meta": "艾瑞 · 2026.04", "tag": "研报"},
        {"number": "04", "title": "Anthropic: Building Effective Agents", "meta": "Anthropic Blog · 2025.12", "tag": "博客"},
        {"number": "05", "title": "OpenAI: A Practical Guide to Building Agents", "meta": "OpenAI Blog · 2026.01", "tag": "博客"},
        {"number": "06", "title": "arXiv: Survey of LLM-based Agents", "meta": "arXiv:2603.xxxxx · 2026.03", "tag": "论文"},
        {"number": "07", "title": "36氪：AI Agent 赛道 2026 上半年融资盘点", "meta": "36氪 · 2026.06", "tag": "资讯"},
        {"number": "08", "title": "虎嗅：从 Chatbot 到 Agent，企业 AI 落地范式转移", "meta": "虎嗅 · 2026.05", "tag": "资讯"},
    ]
"""Research-related API endpoints with SSE streaming."""


import asyncio
import json
from datetime import datetime

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse

from app.schemas import (
    AgentStatus,
    CreateResearchRequest,
    LogEntry,
    ResearchDetail,
    ResearchStatus,
)
from app.store import (
    append_log,
    create_report,
    create_research,
    get_research,
    get_report_by_research,
    list_researches,
    update_agent,
    update_research,
)

router = APIRouter()


# ── CRUD ─────────────────────────────────────────────────────────────────────

@router.get("/", response_model=list[dict])
async def list_all_researches():
    """列出所有调研任务。"""
    items = list_researches()
    return [item.model_dump() for item in items]


@router.post("/", response_model=dict)
async def create_new_research(payload: CreateResearchRequest):
    """创建新的调研任务。"""
    research = create_research(
        topic=payload.topic,
        description=payload.description,
        dimensions=payload.dimensions,
        depth=payload.depth.value,
        formats=payload.formats,
    )
    return research.model_dump()


@router.get("/{rid}", response_model=dict)
async def get_research_detail(rid: str):
    """获取单个调研任务详情。"""
    research = get_research(rid)
    if not research:
        raise HTTPException(status_code=404, detail="调研任务不存在")
    return research.model_dump()


@router.delete("/{rid}")
async def cancel_research(rid: str):
    """取消调研任务。"""
    research = get_research(rid)
    if not research:
        raise HTTPException(status_code=404, detail="调研任务不存在")
    update_research(rid, status=ResearchStatus.failed)
    return {"ok": True, "message": "任务已取消"}


# ── SSE Execution Stream ─────────────────────────────────────────────────────

# Agent execution script — simulated multi-agent pipeline
_AGENT_SCRIPT = [
    # (agent_id, agent_name, agent_color, delay_s, hint, log_msg, log_level, progress)
    ("a1", "采集", "blue", 0.3, "启动全网检索，覆盖 247 个数据源",
     "启动全网检索，覆盖 247 个数据源", "info", 0.05),
    ("a1", "采集", "blue", 0.8, "正在检索资讯类数据源…",
     "检索到 183 条相关资讯 · 36氪、虎嗅、极客公园", "success", 0.15),
    ("a1", "采集", "blue", 0.6, "正在检索行业研报…",
     "检索到 41 篇行业研报 · IDC、Gartner、艾瑞", "success", 0.25),
    ("a1", "采集", "blue", 0.5, "正在检索学术论文…",
     "检索到 23 篇学术论文 · arXiv、ACL、NeurIPS", "success", 0.35),
    ("a1", "采集", "blue", 0.3, "信息采集完成",
     "采集完成，共 247 条原始数据", "success", 0.40),

    ("a2", "核验", "violet", 0.3, "开始交叉比对 183 条数据",
     "开始交叉比对 183 条数据", "info", 0.42),
    ("a2", "核验", "violet", 0.7, "正在识别矛盾信息…",
     "识别 12 条矛盾信息，已标记低可信度", "warning", 0.50),
    ("a2", "核验", "violet", 0.6, "市场规模数据交叉验证中…",
     "市场规模数据交叉验证通过 · 可信度 96.2%", "success", 0.58),
    ("a2", "核验", "violet", 0.5, "竞争格局数据验证中…",
     "竞争格局数据交叉验证通过 · 可信度 91.8%", "success", 0.65),
    ("a2", "核验", "violet", 0.3, "核验完成",
     "核验完成，综合可信度 92.4%", "success", 0.70),

    ("a3", "观点", "green", 0.3, "开始提炼主流观点与争议焦点",
     "开始提炼主流观点与争议焦点", "info", 0.72),
    ("a3", "观点", "green", 0.8, "正在识别共识与分歧…",
     "识别 5 个主流共识、3 个争议焦点", "success", 0.78),
    ("a3", "观点", "green", 0.6, "分析厂商竞争立场…",
     "分析厂商竞争立场：OpenAI / Anthropic / 百度 / 字节", "info", 0.83),
    ("a3", "观点", "green", 0.5, "提炼用户观点…",
     "提炼用户观点：社媒讨论 1,284 条", "success", 0.88),
    ("a3", "观点", "green", 0.3, "观点分析完成",
     "观点对比矩阵生成完毕", "success", 0.90),

    ("a4", "整合", "amber", 0.3, "开始结构化重组信息",
     "开始按维度重组信息流", "info", 0.91),
    ("a4", "整合", "amber", 0.6, "生成行业现状章节…",
     "行业现状概览章节完成", "success", 0.93),
    ("a4", "整合", "amber", 0.5, "生成核心数据章节…",
     "核心数据与图表章节完成", "success", 0.95),
    ("a4", "整合", "amber", 0.3, "内容整合完成",
     "全部 6 个章节整合完毕", "success", 0.96),

    ("a5", "报告", "rose", 0.3, "开始生成最终报告",
     "开始排版与图表渲染", "info", 0.97),
    ("a5", "报告", "rose", 0.5, "渲染图表与引用溯源…",
     "图表渲染完成，引用溯源已附加", "success", 0.99),
    ("a5", "报告", "rose", 0.3, "报告生成完成",
     "完整调研报告已生成，共 18 页", "success", 1.0),
]


@router.get("/{rid}/stream")
async def stream_execution(rid: str):
    """SSE 流式推送调研执行进度。"""
    research = get_research(rid)
    if not research:
        raise HTTPException(status_code=404, detail="调研任务不存在")

    async def event_generator():
        # Mark research as running
        update_research(rid, status=ResearchStatus.running)
        yield _sse("status", {"status": "running", "research_id": rid})

        current_agent = None
        for agent_id, agent_name, color, delay, hint, log_msg, level, progress in _AGENT_SCRIPT:
            await asyncio.sleep(delay)

            # Update agent state
            if current_agent != agent_id:
                # Mark previous agent as completed
                if current_agent:
                    update_agent(rid, current_agent, status=AgentStatus.completed,
                                 progress=1.0, hint="已完成")
                # Mark new agent as running
                current_agent = agent_id
                update_agent(rid, agent_id, status=AgentStatus.running,
                             hint=hint, progress=progress)
                yield _sse("agent_update", {
                    "agent_id": agent_id,
                    "status": "running",
                    "hint": hint,
                    "progress": progress,
                })
            else:
                update_agent(rid, agent_id, hint=hint, progress=progress)
                yield _sse("agent_update", {
                    "agent_id": agent_id,
                    "hint": hint,
                    "progress": progress,
                })

            # Append log
            now = datetime.now().strftime("%H:%M:%S")
            entry = LogEntry(
                timestamp=now,
                agent_id=agent_id,
                agent_name=agent_name,
                message=log_msg,
                level=level,
            )
            append_log(rid, entry)
            yield _sse("log", entry.model_dump())

            # Progress update
            update_research(rid, progress=progress)
            yield _sse("progress", {
                "progress": progress,
                "phase": _phase_name(agent_id),
                "estimated_remaining": _eta(progress),
            })

        # Final agent
        if current_agent:
            update_agent(rid, current_agent, status=AgentStatus.completed,
                         progress=1.0, hint="已完成")

        # Generate report
        report = create_report(rid, research.topic)
        update_research(
            rid,
            status=ResearchStatus.completed,
            progress=1.0,
            completed_at=datetime.now(),
            source_count=247,
            page_count=18,
            credibility=92.4,
            report_id=report.id,
        )

        yield _sse("completed", {
            "research_id": rid,
            "report_id": report.id,
            "source_count": 247,
            "page_count": 18,
            "credibility": 92.4,
        })

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )


def _sse(event: str, data: dict) -> str:
    return f"event: {event}\ndata: {json.dumps(data, ensure_ascii=False)}\n\n"


def _phase_name(agent_id: str) -> str:
    return {
        "a1": "信息采集中",
        "a2": "数据核验中",
        "a3": "观点分析中",
        "a4": "内容整合中",
        "a5": "报告生成中",
    }.get(agent_id, "处理中")


def _eta(progress: float) -> str:
    remaining = max(0, int((1 - progress) * 180))
    m, s = divmod(remaining, 60)
    return f"~{m}:{s:02d}"
