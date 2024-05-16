from sqlalchemy.orm import Session
from app.schemas.user import User, UserCreate
from app.models.user import UserModel
from uuid import UUID

from fastapi import HTTPException

class TaskService:
    @staticmethod
    def create(db:Session, payload:UserCreate):
        db_user = UserModel(
            username = payload.username,
            password = payload.password
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    
    @staticmethod
    def get_all(db:Session):
        users = db.query(UserModel).offset(0).limit(2).all()
        return users
    
    @staticmethod
    def get_one(db:Session, user_id:UUID):
        db_user = db.query(UserModel).filter(UserModel.id == user_id).first()
        if db_user is None:
            raise HTTPException(status_code=404, detail="user not found")
        
        return db_user
    
    @staticmethod
    def update(db:Session, user_id:UUID):
        db_user = db.query(UserModel).filter(UserModel.id == user_id).first()
        if db_user is None:
            raise HTTPException(status_code=404, detail="user not found")
        
        return db_user
