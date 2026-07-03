"""内容整合 Agent — structures and synthesizes analyzed data into report sections."""

from __future__ import annotations

from app.agents.base import AgentStep, BaseAgent


class IntegratorAgent(BaseAgent):
    """Agent responsible for content integration and structuring.

    Takes verified data and analyzed opinions, then organizes them
    into coherent report sections following the research dimensions.
    """

    agent_id = "a4"
    name = "内容整合 Agent"
    icon_color = "amber"

    async def get_steps(self) -> list[AgentStep]:
        dimensions = self.config.get("dimensions", ["行业现状", "核心数据", "主流观点"])

        return [
            AgentStep(
                hint="开始结构化重组信息",
                log_message="开始按维度重组信息流",
                level="info",
                progress=0.91,
                delay=0.3,
            ),
            AgentStep(
                hint="生成行业现状章节…",
                log_message="行业现状概览章节完成",
                level="success",
                progress=0.93,
                delay=0.6,
                result={
                    "section_1": {
                        "title": "行业现状概览",
                        "content": f"2026 年，{self.topic}领域正式从「技术验证期」迈入「规模化落地期」。全球市场规模在 2026 年预计达到 287 亿美元，同比增长 68.3%。",
                    }
                },
            ),
            AgentStep(
                hint="生成核心数据章节…",
                log_message="核心数据与图表章节完成",
                level="success",
                progress=0.95,
                delay=0.5,
                result={
                    "section_2": {
                        "title": "核心数据",
                        "content": "市场在过去三年保持高速增长，2024 年突破 100 亿美元关口后持续加速。",
                        "charts": ["market_growth_trend", "vendor_market_share", "investment_heatmap"],
                    }
                },
            ),
            AgentStep(
                hint="内容整合完成",
                log_message="全部 6 个章节整合完毕",
                level="success",
                progress=0.96,
                delay=0.3,
                result={
                    "sections_count": 6,
                    "sections": [
                        "行业现状概览",
                        "核心数据与趋势",
                        "主流观点分析",
                        "争议点与分歧",
                        "趋势预判",
                        "问题与建议",
                    ],
                },
            ),
        ]
