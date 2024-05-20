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
    members:List[User]

class CreateTeam(BaseModel):
    name:str
    leader_id:UUID

class AddMember(BaseModel):
    member_id:UUID