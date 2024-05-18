from pydantic import BaseModel

from uuid import UUID
from enum import Enum

class User(BaseModel):
    id: UUID
    username: str

class UserCreate(BaseModel):
    username:str
    password:str