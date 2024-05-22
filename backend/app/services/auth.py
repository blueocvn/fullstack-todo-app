from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Optional
from app.schemas.auth import TokenData
from sqlalchemy.orm import Session
from app.models.account import Account
from app.models.user import User
import jwt

from app.core.config import settings

# Secret key to encode/decode JWT tokens
SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_account_by_email(db: Session, email: str):
    account = db.query(Account).filter(Account.email == email).first()
    return account

def decode_jwt(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        user_id : int = payload.get("id")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email,id=user_id)
    except jwt.PyJWTError:
        raise credentials_exception    
    return token_data

def get_user(db: Session, email: str):
    account = get_account_by_email(db, email)
    if account is None:
        raise credentials_exception
    return db.query(User).filter(User.id == account.user_id).first()

