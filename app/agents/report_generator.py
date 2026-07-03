"""报告生成 Agent — produces the final research report with formatting and citations."""

from __future__ import annotations

from app.agents.base import AgentStep, BaseAgent


class ReportGeneratorAgent(BaseAgent):
    """Agent responsible for final report generation.

    Takes integrated content and produces a polished research report
    with proper formatting, charts, and citation references.
    """

    agent_id = "a5"
    name = "报告生成 Agent"
    icon_color = "rose"

    async def get_steps(self) -> list[AgentStep]:
        return [
            AgentStep(
                hint="开始生成最终报告",
                log_message="开始排版与图表渲染",
                level="info",
                progress=0.97,
                delay=0.3,
            ),
            AgentStep(
                hint="渲染图表与引用溯源…",
                log_message="图表渲染完成，引用溯源已附加",
                level="success",
                progress=0.99,
                delay=0.5,
                result={
                    "charts_rendered": 8,
                    "citations_attached": 24,
                    "pages_generated": 18,
                },
            ),
            AgentStep(
                hint="报告生成完成",
                log_message="完整调研报告已生成，共 18 页",
                level="success",
                progress=1.0,
                delay=0.3,
                result={
                    "report_status": "completed",
                    "page_count": 18,
                    "source_count": 247,
                    "credibility": 92.4,
                    "sections": [
                        {
                            "id": "s1",
                            "number": "01",
                            "title": "行业现状概览",
                            "content": "2026 年，AI Agent 行业正式从「技术验证期」迈入「规模化落地期」。全球 AI Agent 市场规模在 2026 年预计达到 287 亿美元，同比增长 68.3%。",
                        },
                        {
                            "id": "s2",
                            "number": "02",
                            "title": "核心数据",
                            "content": "AI Agent 市场在过去三年保持高速增长，2024 年突破 100 亿美元关口后持续加速。",
                        },
                        {
                            "id": "s3",
                            "number": "03",
                            "title": "主流观点",
                            "content": "共识一：Agent 是 AI 的终极形态。超过 78% 的受访技术领导者认为 Agent 将从「辅助工具」演进为「自主执行体」。",
                        },
                        {
                            "id": "s4",
                            "number": "04",
                            "title": "争议点分析",
                            "content": "垂直 Agent 的客户留存率（78%）显著高于通用 Agent（52%），但通用 Agent 的获客成本更低。",
                        },
                        {
                            "id": "s5",
                            "number": "05",
                            "title": "趋势预判",
                            "content": "短期：Agent 编排平台将成为新的基础设施层。长期：Agent 经济生态成型，市场规模有望突破 800 亿美元。",
                        },
                        {
                            "id": "s6",
                            "number": "06",
                            "title": "问题与建议",
                            "content": "Agent 的「幻觉」问题、多 Agent 协作调试工具、企业数据接入合规框架是三大关键挑战。",
                        },
                    ],
                    "sources": [
                        {"number": "01", "title": "IDC Worldwide AI Agent Forecast 2026-2028", "meta": "IDC · 2026.03", "tag": "研报"},
                        {"number": "02", "title": "Gartner Market Guide for AI Agent Platforms", "meta": "Gartner · 2026.02", "tag": "研报"},
                        {"number": "03", "title": "艾瑞咨询：中国 AI Agent 行业研究报告", "meta": "艾瑞 · 2026.04", "tag": "研报"},
                        {"number": "04", "title": "Anthropic: Building Effective Agents", "meta": "Anthropic Blog · 2025.12", "tag": "博客"},
                        {"number": "05", "title": "OpenAI: A Practical Guide to Building Agents", "meta": "OpenAI Blog · 2026.01", "tag": "博客"},
                        {"number": "06", "title": "arXiv: Survey of LLM-based Agents", "meta": "arXiv:2603.xxxxx · 2026.03", "tag": "论文"},
                        {"number": "07", "title": "36氪：AI Agent 赛道 2026 上半年融资盘点", "meta": "36氪 · 2026.06", "tag": "资讯"},
                        {"number": "08", "title": "虎嗅：从 Chatbot 到 Agent，企业 AI 落地范式转移", "meta": "虎嗅 · 2026.05", "tag": "资讯"},
                    ],
                },
            ),
        ]
