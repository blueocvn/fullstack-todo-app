from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from app.schemas.tasks import TaskResponse
from app.services.tasks import TaskService
from app.core.database import get_db

task_router = APIRouter(prefix="/api/tasks",tags=["Tasks"])

@task_router.get("/",response_model=TaskResponse)
def get_tasks(db : Session = Depends(get_db)):
  return TaskService.get_tasks(db=db)