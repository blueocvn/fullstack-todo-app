from fastapi import APIRouter,Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.schemas.tasks import TaskResponse
from app.services.tasks import TaskService
from app.core.database import get_db
from app.schemas.auth import TokenData
from app.services.auth import get_user, get_account_by_email
import jwt

task_router = APIRouter(prefix="/api/tasks",tags=["Tasks"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@task_router.get("/",response_model=TaskResponse)
def get_tasks(db : Session = Depends(get_db)):
  return TaskService.get_tasks(db=db)

# Creating new task
@task_router.post("/",response_model=TaskResponse)
def create_tasks(token: str = Depends(oauth2_scheme), db : Session = Depends(get_db)):
    return 