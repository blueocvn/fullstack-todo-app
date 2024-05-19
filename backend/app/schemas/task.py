from pydantic import BaseModel
from typing import Optional
from uuid import UUID

class CreateTask(BaseModel):
    title: str
    team_id: Optional[UUID] = None

class UpdateTask(BaseModel):
    id:UUID
    title: Optional[str] = None