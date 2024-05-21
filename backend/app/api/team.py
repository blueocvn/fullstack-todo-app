from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from app.core.database import get_db
from app.middlewares.auth_middleware import JWTBearer
from app.schemas.team import CreateTeam, Team, AddMember
from app.services.team import TeamService

router = APIRouter(prefix="/teams", tags=['Teams'])

jwtBearer = JWTBearer()

@router.get("", response_model=List[Team])
def get_teams_by_user(db:Session = Depends(get_db), user:dict = Depends(jwtBearer)):
    return TeamService.get_all_teams_by_user(db, user)

@router.get("/{team_id}")
def get_teams_by_user(team_id:UUID, db:Session = Depends(get_db), user:dict = Depends(jwtBearer)):
    return TeamService.get_one_team(db, team_id)

@router.get("/{team_id}/tasks")
def get_all_tasks_by_team(team_id:UUID, db:Session = Depends(get_db), user:dict = Depends(jwtBearer)):
    return TeamService.get_all_tasks_by_team(db, team_id, user)

@router.get("/{team_id}/members")
def get_all_tasks_by_team(team_id:UUID, db:Session = Depends(get_db), user:dict = Depends(jwtBearer)):
    return TeamService.get_all_members_by_team(db, team_id, user)

@router.post('')
def create(payload:CreateTeam, db:Session = Depends(get_db), user:dict = Depends(jwtBearer)):
    return TeamService.create(db, payload, user)

@router.post('/{team_id}/add')
def add_member(team_id: UUID, payload:AddMember, db:Session = Depends(get_db), user:dict = Depends(jwtBearer)):
    print(team_id)
    return TeamService.add_team_member(db, team_id, payload, user)

@router.delete('/{team_id}')
def delete(team_id: UUID, db:Session = Depends(get_db), user:dict = Depends(jwtBearer)):
    print(team_id)
    return TeamService.delete(db, team_id, user)