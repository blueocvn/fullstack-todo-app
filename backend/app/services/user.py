from sqlalchemy.orm import Session
from fastapi import HTTPException
from fastapi.responses import JSONResponse
from pydantic import EmailStr
from uuid import UUID

from app.schemas.user import SearchUser
from app.models.user import UserModel
from app.models.team import TeamModel
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

    @staticmethod
    def get_all_members_by_leader(db:Session, leader_id:UUID, user:dict):
        try:
            user_id = user.get('id')

            found_team = db.query(TeamModel).filter(
                TeamModel.leader_id == leader_id
            ).first()
            if found_team is None:
                return JSONResponse(content="team not found", status_code=404)
            
            if str(found_team.leader_id) != user_id:
                return JSONResponse(content="you are not leader of the team", status_code=403)
            
            return found_team.members
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=500, detail='Internal server error')