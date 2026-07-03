"""Authentication API endpoints with JWT + PostgreSQL."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth import create_access_token, get_current_user, hash_password, verify_password
from app.database import get_db
from app.models import User
from app.schemas import LoginRequest, RegisterRequest

router = APIRouter()


def _user_response(user: User, token: str) -> dict:
    return {
        "token": token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "plan": user.plan,
            "remaining": user.remaining,
            "company": user.company,
            "title": user.title,
            "created_at": user.created_at.isoformat() if user.created_at else None,
        },
    }


@router.post("/register")
async def register(payload: RegisterRequest, db: AsyncSession = Depends(get_db)):
    """注册新用户。"""
    result = await db.execute(select(User).where(User.email == payload.email))
    if result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="该邮箱已注册")
    user = User(
        name=payload.name,
        email=payload.email,
        password_hash=hash_password(payload.password),
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    token = create_access_token(user.id)
    return _user_response(user, token)


@router.post("/login")
async def login(payload: LoginRequest, db: AsyncSession = Depends(get_db)):
    """用户登录。"""
    result = await db.execute(select(User).where(User.email == payload.email))
    user = result.scalar_one_or_none()
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="邮箱或密码错误")
    token = create_access_token(user.id)
    return _user_response(user, token)


@router.get("/me")
async def me(user: User = Depends(get_current_user)):
    """获取当前登录用户信息。"""
    token = create_access_token(user.id)
    return _user_response(user, token)


@router.post("/demo")
async def demo_user(db: AsyncSession = Depends(get_db)):
    """获取或创建 demo 用户（开发用）。"""
    result = await db.execute(select(User).where(User.email == "lin.siyuan@company.com"))
    user = result.scalar_one_or_none()
    if not user:
        user = User(
            name="林思远",
            email="lin.siyuan@company.com",
            password_hash=hash_password("demo123"),
            company="某头部券商",
            title="科技行业分析师",
        )
        db.add(user)
        await db.commit()
        await db.refresh(user)
    token = create_access_token(user.id)
    return _user_response(user, token)
