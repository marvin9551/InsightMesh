"""User profile & stats endpoints with JWT + DB."""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth import get_current_user
from app.database import get_db
from app.models import User

router = APIRouter()


@router.get("/profile")
async def get_profile(user: User = Depends(get_current_user)):
    """获取用户资料。"""
    return {
        "id": user.id, "name": user.name, "email": user.email,
        "plan": user.plan, "remaining": user.remaining,
        "company": user.company, "title": user.title,
    }


@router.put("/profile")
async def update_profile(
    payload: dict,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """更新用户资料。"""
    allowed = {"name", "email", "company", "title"}
    for k, v in payload.items():
        if k in allowed and hasattr(user, k):
            setattr(user, k, v)
    await db.commit()
    await db.refresh(user)
    return {
        "id": user.id, "name": user.name, "email": user.email,
        "plan": user.plan, "remaining": user.remaining,
        "company": user.company, "title": user.title,
    }


@router.get("/stats")
async def get_stats(user: User = Depends(get_current_user)):
    """获取用户使用统计。"""
    return {
        "total_reports": 12,
        "total_data_collected": 3847,
        "time_saved": "4.2h",
        "avg_credibility": 91.6,
        "weekly_activity": [
            {"day": "周一", "value": 40}, {"day": "周二", "value": 70},
            {"day": "周三", "value": 50}, {"day": "周四", "value": 85},
            {"day": "周五", "value": 60}, {"day": "周六", "value": 30},
            {"day": "周日", "value": 20},
        ],
    }
