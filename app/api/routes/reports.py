"""Report & cases API endpoints with DB."""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models import Report as ReportModel

router = APIRouter()


# ── Reports ──────────────────────────────────────────────────────────────────

@router.get("/reports/{report_id}")
async def get_report_detail(report_id: str, db: AsyncSession = Depends(get_db)):
    """获取报告详情。"""
    result = await db.execute(select(ReportModel).where(ReportModel.id == report_id))
    report = result.scalar_one_or_none()
    if not report:
        raise HTTPException(status_code=404, detail="报告不存在")
    return {
        "id": report.id, "research_id": report.research_id, "topic": report.topic,
        "status": report.status, "page_count": report.page_count,
        "source_count": report.source_count, "credibility": report.credibility,
        "sections": report.sections, "sources": report.sources,
        "created_at": report.created_at.isoformat() if report.created_at else None,
    }


@router.get("/reports/by-research/{research_id}")
async def get_report_by_research_id(research_id: str, db: AsyncSession = Depends(get_db)):
    """通过调研 ID 获取报告。"""
    result = await db.execute(select(ReportModel).where(ReportModel.research_id == research_id))
    report = result.scalar_one_or_none()
    if not report:
        raise HTTPException(status_code=404, detail="报告不存在")
    return {
        "id": report.id, "research_id": report.research_id, "topic": report.topic,
        "status": report.status, "page_count": report.page_count,
        "source_count": report.source_count, "credibility": report.credibility,
        "sections": report.sections, "sources": report.sources,
        "created_at": report.created_at.isoformat() if report.created_at else None,
    }


# ── Cases (static data) ─────────────────────────────────────────────────────

_CASES = [
    {"id": "case1", "category": "行业分析", "tag": "AI Agent", "date": "2026.07.02", "title": "2026 年全球 AI Agent 市场规模与竞争格局分析", "description": "深度分析全球 AI Agent 市场格局，覆盖 OpenAI、Anthropic、Google 等头部厂商。", "stats": [["18", "页"], ["247", "数据源"], ["92%", "可信度"]], "page_count": 18, "source_count": 247, "credibility": 92.0},
    {"id": "case2", "category": "竞品调研", "tag": "新能源车", "date": "2026.06.28", "title": "新能源车 2026 年市场趋势与政策走向", "description": "覆盖比亚迪、特斯拉、蔚来等主流品牌的产品、定价、用户评价对比。", "stats": [["12", "页"], ["156", "数据源"], ["94%", "可信度"]], "page_count": 12, "source_count": 156, "credibility": 94.0},
    {"id": "case3", "category": "趋势预判", "tag": "大模型", "date": "2026.06.21", "title": "大模型在企业落地的最新进展与挑战", "description": "调研金融、医疗、制造等行业的大模型落地案例。", "stats": [["14", "页"], ["198", "数据源"], ["90%", "可信度"]], "page_count": 14, "source_count": 198, "credibility": 90.0},
    {"id": "case4", "category": "学术调研", "tag": "医疗 AI", "date": "2026.06.15", "title": "医疗 AI 影像诊断 2026 年审批进展与商业化调研", "description": "梳理 NMPA 三类医疗器械证批准节奏。", "stats": [["28", "页"], ["312", "数据源"], ["91%", "可信度"]], "page_count": 28, "source_count": 312, "credibility": 91.0},
    {"id": "case5", "category": "竞品调研", "tag": "跨境电商", "date": "2026.06.08", "title": "跨境电商独立站 2026 年运营策略调研", "description": "分析 SHEIN、Temu 等平台的独立站模式。", "stats": [["10", "页"], ["134", "数据源"], ["93%", "可信度"]], "page_count": 10, "source_count": 134, "credibility": 93.0},
    {"id": "case6", "category": "行业分析", "tag": "金融科技", "date": "2026.05.30", "title": "2026 年中国金融科技监管政策与创新趋势", "description": "梳理央行、银保监最新政策动向。", "stats": [["22", "页"], ["267", "数据源"], ["89%", "可信度"]], "page_count": 22, "source_count": 267, "credibility": 89.0},
]


@router.get("/cases")
async def get_cases(category: str = Query("全部")):
    """获取案例列表。"""
    if category and category != "全部":
        return [c for c in _CASES if c["category"] == category]
    return _CASES
"""Report & cases API endpoints."""

from fastapi import APIRouter, HTTPException, Query

from app.store import get_report, get_report_by_research, list_cases

router = APIRouter()


# ── Reports ──────────────────────────────────────────────────────────────────

@router.get("/reports/{report_id}")
async def get_report_detail(report_id: str):
    """获取报告详情。"""
    report = get_report(report_id)
    if not report:
        raise HTTPException(status_code=404, detail="报告不存在")
    return report.model_dump()


@router.get("/reports/by-research/{research_id}")
async def get_report_by_research_id(research_id: str):
    """通过调研 ID 获取报告。"""
    report = get_report_by_research(research_id)
    if not report:
        raise HTTPException(status_code=404, detail="报告不存在")
    return report.model_dump()


# ── Cases ────────────────────────────────────────────────────────────────────

@router.get("/cases")
async def get_cases(category: str = Query("全部", description="筛选分类")):
    """获取案例列表。"""
    items = list_cases(category)
    return [item.model_dump() for item in items]
