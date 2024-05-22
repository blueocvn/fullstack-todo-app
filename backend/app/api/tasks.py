from fastapi import APIRouter,Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.schemas.tasks import TaskResponse, Task
from app.services.tasks import TaskService
from app.core.database import get_db
from app.schemas.auth import TokenData
from app.services.auth import get_user, get_account_by_email
from app.schemas.tasks import TaskCreate,TaskEdit

task_router = APIRouter(prefix="/api/tasks",tags=["Tasks"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@task_router.get("/")
def get_tasks(db : Session = Depends(get_db)):
  return TaskService.get_tasks(db=db)

@task_router.get("/{id}")
def get_tasks(id : int,db: Session = Depends(get_db)):
  return TaskService.get_task(db=db,task_id=id)

# Creating new task
@task_router.post("/")
def create_tasks(task : TaskCreate,token: str = Depends(oauth2_scheme), db : Session = Depends(get_db) ):
    return TaskService.create_task(task=task,db=db,token=token)

@task_router.put("/{id}")
def edit_task(id : int,task : TaskEdit,db : Session = Depends(get_db)):
  return TaskService.edit_task(db=db,task=task,task_id=id) 

@task_router.delete("/{id}")
def delete_task(id: int,db : Session = Depends(get_db)):
  return TaskService.delete_task(task_id=id,db=db)