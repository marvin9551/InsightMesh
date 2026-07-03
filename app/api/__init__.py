"""API route aggregation."""

from fastapi import APIRouter

from app.api.routes import research

router = APIRouter()
router.include_router(research.router, prefix="/research", tags=["research"])
