from fastapi import APIRouter

from .auth import router as auth_router
from .task import router as task_router
from .team import router as team_router
from .user import router as user_router

todo_router = APIRouter(prefix='/api')

todo_router.include_router(auth_router)
todo_router.include_router(task_router)
todo_router.include_router(team_router)
todo_router.include_router(user_router)