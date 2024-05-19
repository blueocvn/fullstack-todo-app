from pydantic import BaseModel, EmailStr

class Register(BaseModel):
    username: str
    email: EmailStr
    password:str

class Login(BaseModel):
    email:EmailStr
    password:str

class ChangePassword(BaseModel):
    old_password:str
    new_password:str