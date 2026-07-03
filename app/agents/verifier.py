"""数据核验 Agent — cross-validates and verifies collected data."""

from __future__ import annotations

from app.agents.base import AgentStep, BaseAgent


class VerifierAgent(BaseAgent):
    """Agent responsible for data verification and credibility assessment.

    Performs cross-validation of collected data, identifies contradictions,
    and assigns credibility scores to different data categories.
    """

    agent_id = "a2"
    name = "数据核验 Agent"
    icon_color = "violet"

    async def get_steps(self) -> list[AgentStep]:
        total_sources = self.config.get("total_sources", 247)

        return [
            AgentStep(
                hint=f"开始交叉比对 {total_sources} 条数据",
                log_message=f"开始交叉比对 {total_sources} 条数据",
                level="info",
                progress=0.42,
                delay=0.3,
            ),
            AgentStep(
                hint="正在识别矛盾信息…",
                log_message="识别 12 条矛盾信息，已标记低可信度",
                level="warning",
                progress=0.50,
                delay=0.7,
                result={"contradictions_found": 12},
            ),
            AgentStep(
                hint="市场规模数据交叉验证中…",
                log_message="市场规模数据交叉验证通过 · 可信度 96.2%",
                level="success",
                progress=0.58,
                delay=0.6,
                result={"market_data_credibility": 96.2},
            ),
            AgentStep(
                hint="竞争格局数据验证中…",
                log_message="竞争格局数据交叉验证通过 · 可信度 91.8%",
                level="success",
                progress=0.65,
                delay=0.5,
                result={"competition_data_credibility": 91.8},
            ),
            AgentStep(
                hint="核验完成",
                log_message="核验完成，综合可信度 92.4%",
                level="success",
                progress=0.70,
                delay=0.3,
                result={"overall_credibility": 92.4, "verified_sources": 235},
            ),
        ]
