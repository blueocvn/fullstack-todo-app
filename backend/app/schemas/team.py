from pydantic import BaseModel, EmailStr
from uuid import UUID
from typing import List

class User(BaseModel):
    id:UUID
    username:str
    email: EmailStr

class Team(BaseModel):
    id:UUID
    name:str
    leader_name:str

class CreateTeam(BaseModel):
    name:str

class AddMember(BaseModel):
    member_id:UUID