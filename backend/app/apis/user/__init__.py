from app.apis.user.auth import router as auth_router
from fastapi import APIRouter

user_router = APIRouter(prefix="/api")
user_router.include_router(auth_router)
