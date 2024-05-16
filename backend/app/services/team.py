from sqlalchemy.orm import Session
from app.schemas.team import TeamCreate, Team
from app.models.team import TeamModel
from uuid import UUID

from fastapi import HTTPException

class TeamService:
    @staticmethod
    def create(db:Session, payload:TeamCreate):
        new_team = TeamModel(
            name = payload.name,
        )
        db.add(new_team)
        db.commit()
        db.refresh(new_team)
        return new_team
    
    # @staticmethod
    # def get_all(db:Session):
    #     users = db.query(UserModel).offset(0).limit(2).all()
    #     return users
    
    # @staticmethod
    # def get_one(db:Session, user_id:UUID):
    #     db_user = db.query(UserModel).filter(UserModel.id == user_id).first()
    #     if db_user is None:
    #         raise HTTPException(status_code=404, detail="user not found")
        
    #     return db_user
    
    # @staticmethod
    # def update(db:Session, user_id:UUID):
    #     db_user = db.query(UserModel).filter(UserModel.id == user_id).first()
    #     if db_user is None:
    #         raise HTTPException(status_code=404, detail="user not found")
        
    #     return db_user
