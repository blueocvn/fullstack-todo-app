from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.user import User
from app.schemas.user import UserResponse

user_router = APIRouter(prefix="/api/users", tags=["Users"])

def get_user_information(db: Session, userid: int):
    user = db.query(User).filter(User.id == userid).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@user_router.get("/{userid}", response_model=UserResponse)
def read_user(userid: int, db: Session = Depends(get_db)):
    user = get_user_information(db, userid)
    return user
