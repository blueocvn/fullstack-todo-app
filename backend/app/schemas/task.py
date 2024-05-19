from pydantic import BaseModel
from typing import Optional
from uuid import UUID

from app.utils.enums import TaskStatus

class UserTask(BaseModel):
    id:UUID
    title:str
    status:str

class CreateTask(BaseModel):
    title: str
    team_id: Optional[UUID] = None

class UpdateTask(BaseModel):
    title: Optional[str] = None

class ChangeTaskStatus(BaseModel):
    status: TaskStatus