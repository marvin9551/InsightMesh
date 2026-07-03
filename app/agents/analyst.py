"""观点分析 Agent — extracts mainstream opinions and debate points."""

from __future__ import annotations

from app.agents.base import AgentStep, BaseAgent


class AnalystAgent(BaseAgent):
    """Agent responsible for opinion mining and sentiment analysis.

    Extracts mainstream consensus, identifies debate points,
    and analyzes stakeholder positions on the research topic.
    """

    agent_id = "a3"
    name = "观点分析 Agent"
    icon_color = "green"

    async def get_steps(self) -> list[AgentStep]:
        return [
            AgentStep(
                hint="开始提炼主流观点与争议焦点",
                log_message="开始提炼主流观点与争议焦点",
                level="info",
                progress=0.72,
                delay=0.3,
            ),
            AgentStep(
                hint="正在识别共识与分歧…",
                log_message="识别 5 个主流共识、3 个争议焦点",
                level="success",
                progress=0.78,
                delay=0.8,
                result={
                    "consensus_count": 5,
                    "debate_count": 3,
                    "consensus": [
                        "AI Agent 是 AI 技术的终极形态",
                        "垂直 Agent 客户留存率更高",
                        "Agent 编排平台将成为新基础设施",
                        "多 Agent 协作是必然趋势",
                        "企业级 Agent 需要可解释性",
                    ],
                    "debates": [
                        "通用 Agent vs 垂直 Agent 哪个更有价值",
                        "Agent 自主程度的边界在哪里",
                        "开源 vs 闭源 Agent 平台的生态竞争",
                    ],
                },
            ),
            AgentStep(
                hint="分析厂商竞争立场…",
                log_message="分析厂商竞争立场：OpenAI / Anthropic / 百度 / 字节",
                level="info",
                progress=0.83,
                delay=0.6,
                result={
                    "vendors_analyzed": ["OpenAI", "Anthropic", "百度", "字节"],
                    "vendor_positions": {
                        "OpenAI": "推动通用 Agent 平台化",
                        "Anthropic": "强调安全可控的 Agent 设计",
                        "百度": "聚焦垂直行业 Agent 落地",
                        "字节": "打造 Agent 生态与开发者工具",
                    },
                },
            ),
            AgentStep(
                hint="提炼用户观点…",
                log_message="提炼用户观点：社媒讨论 1,284 条",
                level="success",
                progress=0.88,
                delay=0.5,
                result={"social_mentions": 1284, "sentiment_distribution": {"positive": 0.62, "neutral": 0.28, "negative": 0.10}},
            ),
            AgentStep(
                hint="观点分析完成",
                log_message="观点对比矩阵生成完毕",
                level="success",
                progress=0.90,
                delay=0.3,
                result={"matrix_generated": True},
            ),
        ]
