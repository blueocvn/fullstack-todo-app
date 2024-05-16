from app.core.database import get_db
from app.schemas.user import CreateUser, LoginUser
from app.services.user import AuthService
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register")
def register(payload: CreateUser, db: Session = Depends(get_db)):
    return AuthService.register(payload=payload, db=db)


@router.post("/login")
def login(payload: LoginUser, db: Session = Depends(get_db)):
    return AuthService.login(payload=payload, db=db)
