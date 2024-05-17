from fastapi import APIRouter
from app.schemas.tasks import TaskResponse
task_router = APIRouter(prefix="/api/tasks",tags=["Tasks"])

@task_router.get("/",response_model=TaskResponse)
def get_tasks():
  tasks = []
  return {
    "data" : tasks
  }