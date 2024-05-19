from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.auth import Register, Login, ChangePassword
from app.core.database import get_db
from app.services.auth import AuthService
from app.middlewares.auth_middleware import JWTBearer

router = APIRouter()

jwtBearer = JWTBearer()

@router.post("/register")
def register(payload:Register, db:Session = Depends(get_db)): 
    return AuthService.register(db, payload)

@router.post("/login")
def login(payload:Login, db:Session = Depends(get_db)): 
    return AuthService.login(db, payload)

@router.patch("/reset-password")
def change_password(payload:ChangePassword, db:Session = Depends(get_db), user:dict = Depends(jwtBearer)): 
    return AuthService.change_password(db, payload, user)