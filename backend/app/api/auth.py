from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from app.models.account import Account
from app.models.user import User
from app.schemas.auth import AccountCreate, AccountResponse, Token, TokenData, PasswordChangeRequest
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

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.post("/register")
def register(account: AccountCreate, db: Session = Depends(get_db)):
    db_account = AuthServices.get_account_by_email(db, account.email)
    if db_account:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"message": "Email already registered"}
        )
    
    user = User(
        name=account.user.name
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    
    hashed_password = AuthServices.get_password_hash(account.password)
    db_account = Account(
        email=account.email,
        password=hashed_password,
        user_id=user.id
    )
    db.add(db_account)
    db.commit()
    db.refresh(db_account)

    return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "Register completed"})

@router.post("/token", response_model=Token)
def login_for_access_token(db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()):
    account = AuthServices.get_account_by_email(db, form_data.username)
    if account is None:
        raise credentials_exception
    if not account or not AuthServices.verify_password(form_data.password, account.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password"
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = AuthServices.create_access_token(
        data={"sub": account.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/accounts/me", response_model=AccountResponse)
async def read_accounts_me(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    token_data = AuthServices.decode_jwt(token)
    user = AuthServices.get_user(db, token_data.email)
    return {"email": token_data.email, "user": user}

@router.post("/accounts/changePassword", status_code=status.HTTP_200_OK)
def change_password(
    password_change: PasswordChangeRequest,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    token_data = AuthServices.decode_jwt(token)
    account = AuthServices.get_account_by_email(db, email=token_data.email)
    if account is None:
        raise credentials_exception

    if not AuthServices.verify_password(password_change.current_password, account.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect current password"
        )
    
    hashed_password = AuthServices.get_password_hash(password_change.new_password)
    account.password = hashed_password
    db.add(account)
    db.commit()
    
    return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "Password changed successfully"})



