from sqlalchemy.orm import Session
from fastapi import HTTPException
from fastapi.responses import JSONResponse
from uuid import UUID

from app.schemas.team import CreateTeam, AddMember, RemoveMember
from app.models import UserModel, TeamModel, TaskModel

class TeamService:
    @staticmethod
    def get_all_teams_by_user(db:Session, user:dict):
        try:
            user_id = user.get('id')

            found_teams_by_leader = db.query(TeamModel).filter(
                TeamModel.leader_id == user_id
            ).all()

            found_teams_by_members = db.query(TeamModel).join(TeamModel.members).filter(
                UserModel.id == user_id
            ).all()

            found_teams = found_teams_by_leader + found_teams_by_members
            for team in found_teams:
                team.leader_name = team.leader.username

            return found_teams
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=500, detail='Internal server error')
        
    @staticmethod
    def get_all_tasks_by_team(db:Session, team_id:UUID, user:dict):
        try:
            user_id = user.get('id')

            found_tasks = db.query(TaskModel).filter(
                TaskModel.team_id == team_id
            ).all()

            found_team = db.query(TeamModel).filter(
                TeamModel.id == team_id
            ).first()
            if found_team is None:
                return JSONResponse(content="team not found", status_code=404)
            
            if user_id != str(found_team.leader_id) and not any(str(member.id) == user_id for member in found_team.members):
                return JSONResponse(content="you are not team's member", status_code=404)
            
            for task in found_tasks:
                task.assignee_name = task.assignee.username

            return found_tasks
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=500, detail='Internal server error')
        
    @staticmethod
    def get_all_members_by_team(db:Session, team_id:UUID, user:dict):
        try:
            user_id = user.get('id')

            found_team = db.query(TeamModel).filter(
                TeamModel.id == team_id
            ).first()
            if found_team is None:
                return JSONResponse(content="team not found", status_code=404)
            
            if user_id != str(found_team.leader_id) and not any(str(member.id) == user_id for member in found_team.members):
                return JSONResponse(content="you are not team's member", status_code=404)

            return found_team.members
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=500, detail='Internal server error')
        
    @staticmethod
    def get_one_team(db:Session, team_id:UUID):
        try:
            found_team = db.query(TeamModel).filter(
                TeamModel.id == team_id
            ).first()

            if found_team is None:
                return JSONResponse(content="team not found", status_code=404)

            found_team.leader_name = found_team.leader.username
            return found_team
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=500, detail='Internal server error')

    @staticmethod
    def create(db:Session, payload:CreateTeam, user:dict):
        try:
            user_id = user.get('id')

            found_user = db.query(UserModel).filter(UserModel.id == user_id).first()
            if found_user is None:
                return JSONResponse(content="user not found", status_code=404)
            
            new_team = TeamModel(
                name = payload.name,
                leader_id = user_id
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
            
            found_member = db.query(UserModel).filter(UserModel.email == payload.email).first()
            if found_member is None:
                return JSONResponse(content="member not found", status_code=404)
            
            if any(member.id == found_member.id for member in found_team.members):
                return JSONResponse(content="this member has already existed in this team", status_code=404)
            
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
    def remove_team_member(db:Session, team_id:UUID, payload:RemoveMember, user:dict):
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
            
            if not any(member.id == found_member.id for member in found_team.members):
                return JSONResponse(content="this member does not existed in this team", status_code=404)
            
            found_team.members.remove(found_member)

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