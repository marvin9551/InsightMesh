"""Research-related API endpoints with SSE streaming."""

from __future__ import annotations

import json
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.agents.pipeline import ResearchPipeline
from app.auth import get_current_user
from app.database import get_db
from app.models import AgentState as AgentStateModel
from app.models import LogEntry as LogEntryModel
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


@router.get("/{rid}/stream")
async def stream_execution(
    rid: str,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """SSE 流式推送调研执行进度 — 使用 Agent Pipeline 驱动。"""
    r = await _get_user_research(db, rid, user.id)

    async def event_generator():
        from app.database import async_session as session_factory

        pipeline = ResearchPipeline(
            research_id=rid,
            topic=r.topic,
            session_factory=session_factory,
            config={
                "dimensions": r.dimensions or [],
                "depth": r.depth,
                "description": r.description,
            },
        )

        async for sse_event in pipeline.run():
            yield sse_event

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "Connection": "keep-alive", "X-Accel-Buffering": "no"},
    )


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
