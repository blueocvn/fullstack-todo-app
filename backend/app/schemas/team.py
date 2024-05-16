from pydantic import BaseModel

from uuid import UUID
from enum import Enum
from typing import List

class Team(BaseModel):
    id: UUID
    name: str
    members: List[UUID] = []
    tasks: List[str] = []

class TeamCreate(BaseModel):
    name:str