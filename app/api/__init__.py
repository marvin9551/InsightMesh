"""API route aggregation."""

from fastapi import APIRouter

from app.api.routes import auth, reports, research, user

router = APIRouter()
router.include_router(auth.router, prefix="/auth", tags=["auth"])
router.include_router(research.router, prefix="/research", tags=["research"])
router.include_router(user.router, prefix="/user", tags=["user"])
router.include_router(reports.router, prefix="", tags=["reports"])
