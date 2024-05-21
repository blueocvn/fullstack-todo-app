from sqlalchemy.orm import Session
from fastapi import HTTPException
from fastapi.responses import JSONResponse
from pydantic import EmailStr

from app.schemas.user import SearchUser
from app.models.user import UserModel
from app.core.config import settings

class UserService:
    @staticmethod
    def search_users_by_email(db:Session, search:str):
        try:
            found_users = db.query(UserModel).filter(
                UserModel.email.ilike(f"%{search}%")
            ).offset(0).limit(3).all()
            return found_users
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=500, detail='Internal server error')

