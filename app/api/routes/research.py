"""Research-related API endpoints."""

from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def list_researches():
    """列出所有调研任务。"""
    return {"researches": []}


@router.post("/")
async def create_research(payload: dict):
    """创建新的调研任务。"""
    return {"id": "placeholder", "topic": payload.get("topic", "")}
"""API routes package."""
