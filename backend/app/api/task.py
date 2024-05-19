from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.task import CreateTask
from app.core.database import get_db
from app.middlewares.auth_middleware import JWTBearer
from app.services.task import TaskService

router = APIRouter(prefix="/tasks", tags=['Tasks'])

jwtBearer = JWTBearer()

@router.post("")
def create(payload:CreateTask, db:Session = Depends(get_db), user:dict = Depends(jwtBearer)): 
    return TaskService.create(db, payload, user)
