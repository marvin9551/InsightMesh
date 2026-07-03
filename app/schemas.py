"""Pydantic schemas for request / response models."""

from __future__ import annotations

import uuid
from datetime import datetime
from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field


# ── Enums ────────────────────────────────────────────────────────────────────

class Depth(str, Enum):
    basic = "basic"
    deep = "deep"
    pro = "pro"


class ResearchStatus(str, Enum):
    pending = "pending"
    running = "running"
    completed = "completed"
    failed = "failed"


class AgentStatus(str, Enum):
    pending = "pending"
    running = "running"
    completed = "completed"
    failed = "failed"


# ── Auth ─────────────────────────────────────────────────────────────────────

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str
    remember: bool = False


class AuthResponse(BaseModel):
    token: str
    user: "UserProfile"


class UserProfile(BaseModel):
    id: str
    name: str
    email: str
    plan: str = "PRO"
    remaining: int = 47
    company: str = ""
    title: str = ""
    created_at: datetime = Field(default_factory=datetime.now)


# ── Research ─────────────────────────────────────────────────────────────────

class CreateResearchRequest(BaseModel):
    topic: str
    description: str = ""
    dimensions: list[str] = Field(default_factory=lambda: ["news", "data", "competitor"])
    depth: Depth = Depth.deep
    formats: list[str] = Field(default_factory=lambda: ["summary", "report"])


class ResearchSummary(BaseModel):
    id: str
    topic: str
    status: ResearchStatus = ResearchStatus.pending
    depth: Depth = Depth.deep
    dimensions: list[str] = Field(default_factory=list)
    formats: list[str] = Field(default_factory=list)
    created_at: datetime = Field(default_factory=datetime.now)
    completed_at: Optional[datetime] = None
    source_count: int = 0
    page_count: int = 0
    credibility: float = 0.0


class ResearchDetail(ResearchSummary):
    description: str = ""
    agents: list["AgentState"] = Field(default_factory=list)
    logs: list["LogEntry"] = Field(default_factory=list)
    progress: float = 0.0
    estimated_remaining: str = ""
    report_id: Optional[str] = None


# ── Agent Execution ──────────────────────────────────────────────────────────

class AgentState(BaseModel):
    id: str
    name: str
    status: AgentStatus = AgentStatus.pending
    hint: str = ""
    progress: float = 0.0
    icon_color: str = "blue"
    result_summary: str = ""


class LogEntry(BaseModel):
    timestamp: str
    agent_id: str
    agent_name: str
    message: str
    level: str = "info"  # info | warning | success


# ── Report ───────────────────────────────────────────────────────────────────

class ReportSection(BaseModel):
    id: str
    number: str
    title: str
    content: str
    subsections: list["ReportSubsection"] = Field(default_factory=list)


class ReportSubsection(BaseModel):
    title: str
    content: str
    chart: Optional[dict] = None


class ReportSource(BaseModel):
    number: str
    title: str
    meta: str
    tag: str


class ReportData(BaseModel):
    id: str
    research_id: str
    status: str = "completed"
    topic: str
    created_at: datetime = Field(default_factory=datetime.now)
    page_count: int = 18
    source_count: int = 247
    credibility: float = 92.4
    sections: list[ReportSection] = Field(default_factory=list)
    sources: list[ReportSource] = Field(default_factory=list)


# ── User Stats ───────────────────────────────────────────────────────────────

class UserStats(BaseModel):
    total_reports: int = 12
    total_data_collected: int = 3847
    time_saved: str = "4.2h"
    avg_credibility: float = 91.6
    weekly_activity: list[dict] = Field(default_factory=list)
    top_domains: list[dict] = Field(default_factory=list)
    depth_distribution: list[dict] = Field(default_factory=list)


# ── Cases ────────────────────────────────────────────────────────────────────

class CaseItem(BaseModel):
    id: str
    category: str
    tag: str
    date: str
    title: str
    description: str
    stats: list[list[str]]
    page_count: int
    source_count: int
    credibility: float
