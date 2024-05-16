from fastapi import APIRouter
from .task import router as tasks_router

todo_router = APIRouter(prefix='/todo')

todo_router.include_router(tasks_router)