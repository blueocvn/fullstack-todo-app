from pydantic import BaseModel

from uuid import UUID
from enum import Enum

class TaskStatus(str, Enum):
    pending = "pending"
    processing = "processing"
    complete = "complete"

class Task(BaseModel):
    id: UUID
    title: str
    status: TaskStatus = TaskStatus.pending