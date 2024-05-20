from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from app.models.account import Account
from app.models.user import User
from app.schemas.auth import AccountCreate, AccountResponse, Token, TokenData
from app.services.auth import verify_password, get_password_hash, create_access_token
from app.core.database import get_db
from typing import Optional
from datetime import timedelta, datetime
import jwt

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_account_by_email(db: Session, email: str):
    return db.query(Account).filter(Account.email == email).first()

def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

@router.post("/register", response_model=AccountResponse)
def register(account: AccountCreate, db: Session = Depends(get_db)):
    db_account = get_account_by_email(db, account.email)
    if db_account:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"message": "Email already registered"}
        )
    
    user = User(
        name=account.user.name,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    
    hashed_password = get_password_hash(account.password)
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
    account = get_account_by_email(db, form_data.username)
    if not account or not verify_password(form_data.password, account.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password"
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": account.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/accounts/me", response_model=AccountResponse)
async def read_accounts_me(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except jwt.PyJWTError:
        raise credentials_exception
    account = get_account_by_email(db, email=token_data.email)
    if account is None:
        raise credentials_exception
    user = get_user(db, account.user_id)
    return {"id": account.id, "email": account.email, "user": user}

@router.get("/accounts/test", response_model=AccountResponse)
async def read_accounts_me(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
