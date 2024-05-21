from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from datetime import date
from app.core.database import get_db
from app.models.user import User
from app.schemas.user import UserResponse

user_router = APIRouter(prefix="/api/users", tags=["Users"])

class UserUpdate(BaseModel):
    name: Optional[str] = None
    dob: Optional[date] = None
    gender: Optional[bool] = None
    phone: Optional[str] = None
    address: Optional[str] = None

def get_user_information(db: Session, userid: int):
    user = db.query(User).filter(User.id == userid).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

def update_user_information(db: Session, userid: int, user_update: UserUpdate):
    user = db.query(User).filter(User.id == userid).first()
    if user:
        if user_update.name is not None:
            user.name = user_update.name
        if user_update.dob is not None:
            user.dob = user_update.dob
        if user_update.gender is not None:
            user.gender = user_update.gender
        if user_update.phone is not None:
            user.phone = user_update.phone
        if user_update.address is not None:
            user.address = user_update.address
        db.commit()
        db.refresh(user)
    return user

@user_router.get("/{userid}", response_model=UserResponse)
def read_user(userid: int, db: Session = Depends(get_db)):
    user = get_user_information(db, userid)
    return user

@user_router.put("/{userid}", response_model=UserResponse)
def update_user(userid: int, user_update: UserUpdate, db: Session = Depends(get_db)):
    user = get_user_information(db, userid)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    updated_user = update_user_information(db, userid, user_update)
    return updated_user
