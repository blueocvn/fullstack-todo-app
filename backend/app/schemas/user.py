from pydantic import BaseModel, EmailStr

class SearchUser(BaseModel):
    email: EmailStr
