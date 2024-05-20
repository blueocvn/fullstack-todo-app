from sqlalchemy.orm import Session
from fastapi import HTTPException
from fastapi.responses import JSONResponse
from uuid import UUID

from app.schemas.team import CreateTeam, AddMember
from app.models import UserModel, TeamModel

class TeamService:
    @staticmethod
    def create(db:Session, payload:CreateTeam, user:dict):
        try:
            user_id = user.get('id')

            found_user = db.query(UserModel).filter(UserModel.id == user_id).first()
            if found_user is None:
                return JSONResponse(content="user not found", status_code=404)
            
            new_team = TeamModel(
                name = payload.name,
                leader_id = payload.leader_id
            )

            db.add(new_team)
            db.commit()
            db.refresh(new_team)

            team_data = {
                'id':new_team.id,
                'name': new_team.name,
                'leader_name': new_team.leader.username,
                'members': new_team.members
            }

            return team_data
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=500, detail='Internal server error')
        
    @staticmethod
    def add_team_member(db:Session, team_id:UUID, payload:AddMember, user:dict):
        try:
            user_id = user.get('id')

            found_team = db.query(TeamModel).filter(
                TeamModel.id == team_id,
                TeamModel.leader_id == user_id
            ).first()

            if found_team is None:
                return JSONResponse(content="team not found", status_code=404)
            
            found_member = db.query(UserModel).filter(UserModel.id == payload.member_id).first()
            if found_member is None:
                return JSONResponse(content="member not found", status_code=404)
            
            found_team.members.append(found_member)

            db.commit()
            db.refresh(found_team)

            found_team.leader_name = found_team.leader.username

            return found_team
        except Exception as e:
            print(e)
            db.rollback()
            raise HTTPException(status_code=500, detail='Internal server error')
        
    @staticmethod 
    def delete(db:Session, team_id:UUID, user:dict):
        try:
            user_id = user.get('id')

            found_team = db.query(TeamModel).filter(
                TeamModel.id == team_id,
                TeamModel.leader_id == user_id
            ).first()
            if found_team is None:
                return JSONResponse(content="team not found", status_code=404)
            
            db.delete(found_team)
            db.commit()

            return JSONResponse(content="team has been deleted successfully", status_code=200)
        except Exception as e:
            print(e)
            db.rollback()
            raise HTTPException(status_code=500, detail='Internal server error')