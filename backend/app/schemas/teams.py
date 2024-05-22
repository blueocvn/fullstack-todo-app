from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TeamCreate(BaseModel):
    name: str

class Team(BaseModel):
    id: int
    name: str    

class User(BaseModel):
    id: int
    name: str
    class Config: 
        orm_mode = True

class Task(BaseModel):
    id: int
    name: str    
    status: int
    createAt: Optional[datetime] = None
    updateAt: Optional[datetime] = None
    class Config: 
        orm_mode = True

class ResponseTeam(BaseModel):
    id: int
    name: str
    listUser: list[User]
    listTask: list[Task]


