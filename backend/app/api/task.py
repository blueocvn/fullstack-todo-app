from typing import List
from uuid import UUID

from app.core.database import get_db
from app.middlewares.auth_middleware import JWTBearer
from app.schemas.task import ChangeTaskStatus, CreateTask, UpdateTask, UserTask, AssignTask
from app.services.task import TaskService
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

router = APIRouter(prefix="/tasks", tags=["Tasks"])

jwtBearer = JWTBearer()


@router.get("", response_model=List[UserTask])
def get_all_tasks_by_user(
    db: Session = Depends(get_db), user: dict = Depends(jwtBearer)
):
    return TaskService.get_all_tasks_by_user(db, user)


@router.get("/{task_id}")
def get_one_task(
    task_id: UUID, db: Session = Depends(get_db), user: dict = Depends(jwtBearer)
):
    return TaskService.get_one_task(db, task_id, user)


@router.post("")
def create(
    payload: CreateTask, db: Session = Depends(get_db), user: dict = Depends(jwtBearer)
):
    return TaskService.create(db, payload, user)


@router.patch("/{task_id}")
def update(
    task_id: UUID,
    payload: UpdateTask,
    db: Session = Depends(get_db),
    user: dict = Depends(jwtBearer),
):
    return TaskService.update(db, task_id, payload, user)


@router.patch("/{task_id}/status")
def update(
    task_id: UUID,
    payload: ChangeTaskStatus,
    db: Session = Depends(get_db),
    user: dict = Depends(jwtBearer),
):
    return TaskService.change_task_status(db, task_id, payload, user)

@router.delete("/{task_id}")
def delete(task_id:UUID, db:Session = Depends(get_db), user:dict = Depends(jwtBearer)): 
    return TaskService.delete(db, task_id, user)

@router.put("/{task_id}/assign")
def assign_task(task_id:UUID, payload:AssignTask, db:Session = Depends(get_db), user:dict = Depends(jwtBearer)): 
    return TaskService.assign_task(db, task_id, payload, user)
