"""信息采集 Agent — crawls and aggregates data from multiple sources."""

from __future__ import annotations

from app.agents.base import AgentStep, BaseAgent


class CollectorAgent(BaseAgent):
    """Agent responsible for gathering raw data from various sources.

    Searches news, industry reports, academic papers, and social media
    to build a comprehensive dataset for the research topic.
    """

    agent_id = "a1"
    name = "信息采集 Agent"
    icon_color = "blue"

    async def get_steps(self) -> list[AgentStep]:
        return [
            AgentStep(
                hint="启动全网检索，覆盖 247 个数据源",
                log_message="启动全网检索，覆盖 247 个数据源",
                level="info",
                progress=0.05,
                delay=0.3,
            ),
            AgentStep(
                hint="正在检索资讯类数据源…",
                log_message="检索到 183 条相关资讯 · 36氪、虎嗅、极客公园",
                level="success",
                progress=0.15,
                delay=0.8,
                result={"news_count": 183, "news_sources": ["36氪", "虎嗅", "极客公园"]},
            ),
            AgentStep(
                hint="正在检索行业研报…",
                log_message="检索到 41 篇行业研报 · IDC、Gartner、艾瑞",
                level="success",
                progress=0.25,
                delay=0.6,
                result={"report_count": 41, "report_sources": ["IDC", "Gartner", "艾瑞"]},
            ),
            AgentStep(
                hint="正在检索学术论文…",
                log_message="检索到 23 篇学术论文 · arXiv、ACL、NeurIPS",
                level="success",
                progress=0.35,
                delay=0.5,
                result={"paper_count": 23, "paper_sources": ["arXiv", "ACL", "NeurIPS"]},
            ),
            AgentStep(
                hint="信息采集完成",
                log_message="采集完成，共 247 条原始数据",
                level="success",
                progress=0.40,
                delay=0.3,
                result={"total_sources": 247, "news_count": 183, "report_count": 41, "paper_count": 23},
            ),
        ]
