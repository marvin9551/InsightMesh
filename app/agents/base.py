"""Base agent abstraction for multi-agent research pipeline."""

from __future__ import annotations

import asyncio
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from datetime import datetime
from typing import Any, AsyncIterator

from sqlalchemy import update
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import AgentState as AgentStateModel
from app.models import LogEntry as LogEntryModel
from app.models import Research as ResearchModel


@dataclass
class AgentStep:
    """A single execution step within an agent."""

    hint: str
    log_message: str
    level: str = "info"  # info | warning | success
    progress: float = 0.0
    delay: float = 0.5
    result: dict[str, Any] = field(default_factory=dict)


@dataclass
class AgentResult:
    """Output produced by an agent after execution."""

    status: str = "completed"
    summary: str = ""
    data: dict[str, Any] = field(default_factory=dict)


class BaseAgent(ABC):
    """Abstract base class for all research agents.

    Each agent has a unique ID, name, and icon color. Agents execute
    a sequence of steps and yield SSE events for real-time updates.
    """

    agent_id: str = ""
    name: str = ""
    icon_color: str = "blue"

    def __init__(self, research_id: str, topic: str, config: dict[str, Any] | None = None):
        self.research_id = research_id
        self.topic = topic
        self.config = config or {}
        self._result: AgentResult = AgentResult()

    @abstractmethod
    async def get_steps(self) -> list[AgentStep]:
        """Return the list of execution steps for this agent."""
        ...

    async def execute(self, session_factory) -> AsyncIterator[dict]:
        """Execute all steps and yield SSE events.

        After the generator is exhausted, access `self.result` for the AgentResult.

        Args:
            session_factory: Async session factory for DB operations.

        Yields:
            SSE event dicts with keys: event, data
        """
        steps = await self.get_steps()

        # Mark agent as running
        async with session_factory() as session:
            await session.execute(
                update(AgentStateModel)
                .where(AgentStateModel.research_id == self.research_id)
                .where(AgentStateModel.agent_id == self.agent_id)
                .values(status="running", hint=steps[0].hint if steps else "启动中…", progress=0.0)
            )
            await session.commit()

        for i, step in enumerate(steps):
            await asyncio.sleep(step.delay)

            now = datetime.now().strftime("%H:%M:%S")

            # Update agent state in DB
            async with session_factory() as session:
                await session.execute(
                    update(AgentStateModel)
                    .where(AgentStateModel.research_id == self.research_id)
                    .where(AgentStateModel.agent_id == self.agent_id)
                    .values(hint=step.hint, progress=step.progress)
                )

                # Add log entry
                log_entry = LogEntryModel(
                    research_id=self.research_id,
                    timestamp=now,
                    agent_id=self.agent_id,
                    agent_name=self.name,
                    message=step.log_message,
                    level=step.level,
                )
                session.add(log_entry)

                # Update research progress
                await session.execute(
                    update(ResearchModel)
                    .where(ResearchModel.id == self.research_id)
                    .values(progress=step.progress)
                )
                await session.commit()

            # Yield SSE events
            yield {
                "event": "agent_update",
                "data": {
                    "agent_id": self.agent_id,
                    "status": "running",
                    "hint": step.hint,
                    "progress": step.progress,
                },
            }
            yield {
                "event": "log",
                "data": {
                    "timestamp": now,
                    "agent_id": self.agent_id,
                    "agent_name": self.name,
                    "message": step.log_message,
                    "level": step.level,
                },
            }
            yield {
                "event": "progress",
                "data": {
                    "progress": step.progress,
                    "phase": self._phase_name(),
                    "estimated_remaining": self._eta(step.progress),
                },
            }

            # Store step result for downstream agents
            if step.result:
                self._result.data.update(step.result)

        # Mark agent as completed
        async with session_factory() as session:
            await session.execute(
                update(AgentStateModel)
                .where(AgentStateModel.research_id == self.research_id)
                .where(AgentStateModel.agent_id == self.agent_id)
                .values(status="completed", progress=1.0, hint="已完成", result_summary=self._result.summary)
            )
            await session.commit()

        self._result.status = "completed"

    def _phase_name(self) -> str:
        """Return the phase name for this agent."""
        return self.name.replace(" Agent", "") + "中"

    @staticmethod
    def _eta(progress: float) -> str:
        """Estimate remaining time based on progress."""
        remaining = max(0, int((1 - progress) * 180))
        m, s = divmod(remaining, 60)
        return f"~{m}:{s:02d}"
