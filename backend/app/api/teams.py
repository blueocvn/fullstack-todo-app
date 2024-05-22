from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from app.models.account import Account
from app.models.teams import Team
from app.models.user_team import User_team
import app.schemas.teams as teamSchema
import app.services.auth as AuthServices
from app.core.database import get_db
from typing import Optional
from datetime import timedelta, datetime
import jwt

from app.core.config import settings

SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES

credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)

team_router = APIRouter(prefix="/api/teams", tags=["Teams"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@team_router.get("/")
def getTeam(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    token_data = AuthServices.decode_jwt(token)
    user = AuthServices.get_user(db, token_data.email)
    listUser_Team = [ e[0] for e in db.query(User_team.team_id).filter(User_team.user_id == user.id).all() ] 
    
    listTeam = db.query(Team).filter(Team.id.in_(listUser_Team)).all()
    
    response = list[None]

    for e in listTeam:
        response.append({
            e.id,
            e.name
        })

    return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "Get team completed", "data":response})

@team_router.post("/create")
def createTeam(team: teamSchema.TeamCreate, db: Session = Depends(get_db)):
    newTeam = Team(
        name = team.name,
        createAt = datetime.utcnow(),
        updateAt = datetime.utcnow()
    )
    
    db.add(newTeam)
    db.commit()
    db.refresh(newTeam)
    
    return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "Create new team completed"})

@team_router.post("/invite")
def inviteUser(userID: int, teamID: int, db: Session = Depends(get_db)):
    user_team = User_team(
        user_id = userID,
        team_id = teamID
    )

    db.add(user_team)
    db.commit()
    db.refresh(user_team)   

    return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "Invite user successfully"})

@team_router.put("/kick")
def kickUser(userID: int, teamID: int, db: Session = Depends(get_db)):
    user_team = db.query(User_team).filter(User_team.user_id == userID, User_team.team_id == teamID).first()
    db.delete(user_team)
    db.commit()

    return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "Kick user successfully"})

@team_router.put("/update")
def updateTeam(team: teamSchema.Team, db: Session = Depends(get_db)):
    db.query(Team).filter(Team.id == team.id).update({Team.name: team.name})
    db.commit()
    return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "Update team successfully"})
