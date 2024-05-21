from pydantic import BaseModel
from datetime import date

class UserResponse(BaseModel):
    id: int
    name: str
    dob: date
    gender: bool
    phone: str
    address: str

    class Config:
        orm_mode = True
