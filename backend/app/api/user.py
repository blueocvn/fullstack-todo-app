from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from pydantic import EmailStr

from app.core.database import get_db
from app.middlewares.auth_middleware import JWTBearer
from app.schemas.user import SearchUser
from app.services.user import UserService

router = APIRouter(prefix="/users", tags=['Users'])

jwtBearer = JWTBearer()

@router.get("")
def search_users_by_email(search:str, db:Session = Depends(get_db), user:dict = Depends(jwtBearer)):
    return UserService.search_users_by_email(db, search)

@router.get("/leader/{leader_id}/members")
def get_members_by_leader(leader_id:UUID, db:Session = Depends(get_db), user:dict = Depends(jwtBearer)):
    return UserService.get_all_members_by_leader(db, leader_id, user)