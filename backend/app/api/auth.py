from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.auth import Register, Login
from app.core.database import get_db
from app.services.auth import AuthService

router = APIRouter()

@router.post("/register")
def register(payload:Register, db:Session = Depends(get_db)): 
    return AuthService.register(db, payload)

@router.post("/login")
def login(payload:Login, db:Session = Depends(get_db)): 
    return AuthService.login(db, payload)