"""Agent layer — built on DeepAgents for multi-agent orchestration."""

from app.agents.analyst import AnalystAgent
from app.agents.base import AgentResult, AgentStep, BaseAgent
from app.agents.collector import CollectorAgent
from app.agents.integrator import IntegratorAgent
from app.agents.pipeline import ResearchPipeline
from app.agents.report_generator import ReportGeneratorAgent
from app.agents.verifier import VerifierAgent

__all__ = [
    "AgentResult",
    "AgentStep",
    "AnalystAgent",
    "BaseAgent",
    "CollectorAgent",
    "IntegratorAgent",
    "ReportGeneratorAgent",
    "ResearchPipeline",
    "VerifierAgent",
]
"""Agent layer — built on DeepAgents for multi-agent orchestration."""
