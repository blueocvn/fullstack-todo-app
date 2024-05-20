from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    name: str

class AccountCreate(BaseModel):
    email: str
    password: str
    user: UserCreate

class AccountLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    dob: Optional[datetime] = None
    gender: Optional[bool] = None
    phone: Optional[str] = None
    address: Optional[str] = None

    class Config:
        orm_mode = True

class AccountResponse(BaseModel):
    id: int
    email: str
    user: UserResponse

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
