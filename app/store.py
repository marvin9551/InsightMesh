"""In-memory data store for the prototype."""

from __future__ import annotations

import uuid
from datetime import datetime

from app.schemas import (
    AgentState,
    AgentStatus,
    CaseItem,
    LogEntry,
    ReportData,
    ReportSection,
    ReportSource,
    ResearchDetail,
    ResearchStatus,
    ResearchSummary,
    UserStats,
    UserProfile,
)


def _uid() -> str:
    return uuid.uuid4().hex[:12]


# ── Users ────────────────────────────────────────────────────────────────────

_users: dict[str, dict] = {}
_token_map: dict[str, str] = {}  # token -> user_id


def create_user(name: str, email: str, password: str) -> UserProfile:
    uid = _uid()
    user = UserProfile(id=uid, name=name, email=email)
    _users[uid] = {"profile": user, "password": password}
    return user


def get_user_by_email(email: str) -> tuple[UserProfile, str] | None:
    for uid, data in _users.items():
        if data["profile"].email == email:
            return data["profile"], data["password"]
    return None


def issue_token(user_id: str) -> str:
    token = uuid.uuid4().hex
    _token_map[token] = user_id
    return token


def get_user_by_token(token: str) -> UserProfile | None:
    user_id = _token_map.get(token)
    if not user_id or user_id not in _users:
        return None
    return _users[user_id]["profile"]


def update_user(user_id: str, **kwargs) -> UserProfile | None:
    if user_id not in _users:
        return None
    profile = _users[user_id]["profile"]
    for k, v in kwargs.items():
        if hasattr(profile, k):
            setattr(profile, k, v)
    return profile


# ── Research ─────────────────────────────────────────────────────────────────

_researches: dict[str, ResearchDetail] = {}


def create_research(
    topic: str,
    description: str = "",
    dimensions: list[str] | None = None,
    depth: str = "deep",
    formats: list[str] | None = None,
) -> ResearchDetail:
    rid = _uid()
    agents = _default_agents()
    detail = ResearchDetail(
        id=rid,
        topic=topic,
        description=description,
        dimensions=dimensions or ["news", "data", "competitor"],
        depth=depth,
        formats=formats or ["summary", "report"],
        status=ResearchStatus.pending,
        agents=agents,
        logs=[],
        progress=0.0,
    )
    _researches[rid] = detail
    return detail


def get_research(rid: str) -> ResearchDetail | None:
    return _researches.get(rid)


def list_researches(user_token: str | None = None) -> list[ResearchSummary]:
    return [
        ResearchSummary(
            id=r.id,
            topic=r.topic,
            status=r.status,
            depth=r.depth,
            dimensions=r.dimensions,
            formats=r.formats,
            created_at=r.created_at,
            completed_at=r.completed_at,
            source_count=r.source_count,
            page_count=r.page_count,
            credibility=r.credibility,
        )
        for r in _researches.values()
    ]


def update_research(rid: str, **kwargs) -> ResearchDetail | None:
    r = _researches.get(rid)
    if not r:
        return None
    for k, v in kwargs.items():
        if hasattr(r, k):
            setattr(r, k, v)
    return r


def append_log(rid: str, entry: LogEntry) -> None:
    r = _researches.get(rid)
    if r:
        r.logs.append(entry)


def update_agent(rid: str, agent_id: str, **kwargs) -> None:
    r = _researches.get(rid)
    if not r:
        return
    for a in r.agents:
        if a.id == agent_id:
            for k, v in kwargs.items():
                if hasattr(a, k):
                    setattr(a, k, v)
            break


# ── Reports ──────────────────────────────────────────────────────────────────

_reports: dict[str, ReportData] = {}


def create_report(research_id: str, topic: str) -> ReportData:
    rid = _uid()
    report = _build_demo_report(rid, research_id, topic)
    _reports[rid] = report
    return report


def get_report(report_id: str) -> ReportData | None:
    return _reports.get(report_id)


def get_report_by_research(research_id: str) -> ReportData | None:
    for r in _reports.values():
        if r.research_id == research_id:
            return r
    return None


# ── Cases ────────────────────────────────────────────────────────────────────

_cases: list[CaseItem] = [
    CaseItem(
        id="case1", category="行业分析", tag="AI Agent", date="2026.07.02",
        title="2026 年全球 AI Agent 市场规模与竞争格局分析",
        description="深度分析全球 AI Agent 市场格局，覆盖 OpenAI、Anthropic、Google 等头部厂商，含市场规模、份额分布、趋势预判。",
        stats=[["18", "页"], ["247", "数据源"], ["92%", "可信度"]],
        page_count=18, source_count=247, credibility=92.0,
    ),
    CaseItem(
        id="case2", category="竞品调研", tag="新能源车", date="2026.06.28",
        title="新能源车 2026 年市场趋势与政策走向",
        description="覆盖比亚迪、特斯拉、蔚来等主流品牌的产品、定价、用户评价对比，分析补贴退坡后的竞争格局。",
        stats=[["12", "页"], ["156", "数据源"], ["94%", "可信度"]],
        page_count=12, source_count=156, credibility=94.0,
    ),
    CaseItem(
        id="case3", category="趋势预判", tag="大模型", date="2026.06.21",
        title="大模型在企业落地的最新进展与挑战",
        description="调研金融、医疗、制造等行业的大模型落地案例，分析技术瓶颈、成本结构与组织适配问题。",
        stats=[["14", "页"], ["198", "数据源"], ["90%", "可信度"]],
        page_count=14, source_count=198, credibility=90.0,
    ),
    CaseItem(
        id="case4", category="学术调研", tag="医疗 AI", date="2026.06.15",
        title="医疗 AI 影像诊断 2026 年审批进展与商业化调研",
        description="梳理 NMPA 三类医疗器械证批准节奏，分析 AI 影像产品的商业化路径与投资格局。",
        stats=[["28", "页"], ["312", "数据源"], ["91%", "可信度"]],
        page_count=28, source_count=312, credibility=91.0,
    ),
    CaseItem(
        id="case5", category="竞品调研", tag="跨境电商", date="2026.06.08",
        title="跨境电商独立站 2026 年运营策略调研",
        description="分析 SHEIN、Temu 等平台的独立站模式，对比 Shopify、Shoplazza 等建站工具，输出运营策略建议。",
        stats=[["10", "页"], ["134", "数据源"], ["93%", "可信度"]],
        page_count=10, source_count=134, credibility=93.0,
    ),
    CaseItem(
        id="case6", category="行业分析", tag="金融科技", date="2026.05.30",
        title="2026 年中国金融科技监管政策与创新趋势",
        description="梳理央行、银保监最新政策动向，分析数字人民币、智能投顾、开放银行等创新方向的发展前景。",
        stats=[["22", "页"], ["267", "数据源"], ["89%", "可信度"]],
        page_count=22, source_count=267, credibility=89.0,
    ),
]


def list_cases(category: str | None = None) -> list[CaseItem]:
    if category and category != "全部":
        return [c for c in _cases if c.category == category]
    return _cases


# ── Stats ────────────────────────────────────────────────────────────────────

def get_user_stats() -> UserStats:
    return UserStats(
        weekly_activity=[
            {"day": "周一", "value": 40},
            {"day": "周二", "value": 70},
            {"day": "周三", "value": 55},
            {"day": "周四", "value": 85},
            {"day": "周五", "value": 60},
            {"day": "周六", "value": 30},
            {"day": "周日", "value": 45},
        ],
        top_domains=[
            {"domain": "AI Agent", "count": 4},
            {"domain": "大模型", "count": 3},
            {"domain": "新能源车", "count": 2},
        ],
        depth_distribution=[
            {"depth": "深度调研", "count": 7},
            {"depth": "基础调研", "count": 3},
            {"depth": "专业调研", "count": 2},
        ],
    )


# ── Helpers ──────────────────────────────────────────────────────────────────

def _default_agents() -> list[AgentState]:
    return [
        AgentState(id="a1", name="信息采集 Agent", status=AgentStatus.pending,
                   hint="等待启动…", icon_color="blue"),
        AgentState(id="a2", name="数据核验 Agent", status=AgentStatus.pending,
                   hint="等待信息采集完成…", icon_color="violet"),
        AgentState(id="a3", name="观点分析 Agent", status=AgentStatus.pending,
                   hint="等待数据核验完成…", icon_color="green"),
        AgentState(id="a4", name="内容整合 Agent", status=AgentStatus.pending,
                   hint="等待观点分析完成…", icon_color="amber"),
        AgentState(id="a5", name="报告生成 Agent", status=AgentStatus.pending,
                   hint="等待内容整合完成…", icon_color="rose"),
    ]


def _build_demo_report(report_id: str, research_id: str, topic: str) -> ReportData:
    return ReportData(
        id=report_id,
        research_id=research_id,
        topic=topic,
        page_count=18,
        source_count=247,
        credibility=92.4,
        sections=[
            ReportSection(
                id="s1", number="01", title="行业现状概览",
                content=(
                    "2026 年，AI Agent 行业正式从「技术验证期」迈入「规模化落地期」。"
                    "以大语言模型为核心推理引擎、结合工具调用与多步规划能力的 Agent 系统，"
                    "正在从实验室走向企业级生产环境。全球 AI Agent 市场规模在 2026 年预计达到 287 亿美元，"
                    "同比增长 68.3%，显著高于整体 AI 软件市场 32% 的增速。"
                ),
            ),
            ReportSection(
                id="s2", number="02", title="核心数据",
                content=(
                    "AI Agent 市场在过去三年保持高速增长，2024 年突破 100 亿美元关口后持续加速。"
                    "头部效应显著，前 5 厂商合计占据 58% 市场。"
                ),
            ),
            ReportSection(
                id="s3", number="03", title="主流观点",
                content=(
                    "共识一：Agent 是 AI 的终极形态。超过 78% 的受访技术领导者认为，"
                    "Agent 将从「辅助工具」演进为「自主执行体」。"
                ),
            ),
            ReportSection(
                id="s4", number="04", title="争议点分析",
                content=(
                    "争议一：通用 Agent vs 垂直 Agent 谁主沉浮？"
                    "垂直 Agent 的客户留存率（78%）显著高于通用 Agent（52%），"
                    "但通用 Agent 的获客成本更低。"
                ),
            ),
            ReportSection(
                id="s5", number="05", title="趋势预判",
                content=(
                    "短期（2026-2027）：Agent 编排平台将成为新的基础设施层。"
                    "中期（2027-2028）：Agent 开始承担端到端业务流程。"
                    "长期（2028+）：Agent 经济生态成型，市场规模有望突破 800 亿美元。"
                ),
            ),
            ReportSection(
                id="s6", number="06", title="问题与建议",
                content=(
                    "关键问题：1. Agent 的「幻觉」问题在生产环境仍可能造成实质性损失；"
                    "2. 多 Agent 协作的调试与监控工具尚不成熟；"
                    "3. 企业数据接入的合规与安全框架有待完善。"
                ),
            ),
        ],
        sources=[
            ReportSource(number="01", title="IDC Worldwide AI Agent Forecast 2026-2028", meta="IDC · 2026.03", tag="研报"),
            ReportSource(number="02", title="Gartner Market Guide for AI Agent Platforms", meta="Gartner · 2026.02", tag="研报"),
            ReportSource(number="03", title="艾瑞咨询：中国 AI Agent 行业研究报告", meta="艾瑞 · 2026.04", tag="研报"),
            ReportSource(number="04", title="Anthropic: Building Effective Agents", meta="Anthropic Blog · 2025.12", tag="博客"),
            ReportSource(number="05", title="OpenAI: A Practical Guide to Building Agents", meta="OpenAI Blog · 2026.01", tag="博客"),
            ReportSource(number="06", title="arXiv: Survey of LLM-based Agents", meta="arXiv:2603.xxxxx · 2026.03", tag="论文"),
            ReportSource(number="07", title="36氪：AI Agent 赛道 2026 上半年融资盘点", meta="36氪 · 2026.06", tag="资讯"),
            ReportSource(number="08", title="虎嗅：从 Chatbot 到 Agent，企业 AI 落地范式转移", meta="虎嗅 · 2026.05", tag="资讯"),
        ],
    )


# ── Seed default demo user ──────────────────────────────────────────────────

def seed_demo_user() -> UserProfile:
    """Create a demo user for testing."""
    existing = get_user_by_email("lin.siyuan@company.com")
    if existing:
        return existing[0]
    user = create_user("林思远", "lin.siyuan@company.com", "demo123")
    update_user(user.id, company="某头部券商", title="科技行业分析师")
    return user
