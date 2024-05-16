from uuid import UUID

from pydantic import BaseModel


class User(BaseModel):
    id: UUID
    username: str
    password: str


class CreateUser(BaseModel):
    username: str
    password: str


class LoginUser(BaseModel):
    username: str
    password: str
