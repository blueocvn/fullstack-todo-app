from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.user import User, UserCreate
from typing import List
from uuid import UUID

from app.services.task import TaskService

router = APIRouter(prefix="/user", tags=['Tasks'])

@router.get("", response_model=List[User])
def get_all( db:Session = Depends(get_db)): 
    return TaskService.get_all(db)

@router.get("/{user_id}", response_model=User)
def get_one(user_id:UUID, db:Session = Depends(get_db)): 
    return TaskService.get_one(db, user_id)

@router.post("", response_model=User)
def create(payload:UserCreate, db:Session = Depends(get_db)): 
    return TaskService.create(db, payload)

@router.patch("", response_model=User)
def create(payload:UserCreate, db:Session = Depends(get_db)): 
    return TaskService.create(db, payload)