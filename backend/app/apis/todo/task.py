from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from typing import List

from app.services.task import TaskService

router = APIRouter(prefix="/task", tags=['Tasks'])

@router.get("")
def get_all(): 
    print()
    return TaskService.get_all()