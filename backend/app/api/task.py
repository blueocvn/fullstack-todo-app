from fastapi import APIRouter
from app.schemas.task import Task
task_router = APIRouter(prefix="/api/tasks",tags=["Tasks"])

@task_router.get("/",response_model=list[Task])
def get_tasks():
  tasks = []
  return {
    "data" : tasks
  }