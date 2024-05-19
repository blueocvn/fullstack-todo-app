from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse
from passlib.context import CryptContext
import jwt

from app.schemas.auth import Register, Login
from app.models.user import UserModel
from app.core.config import settings

pwd_context = CryptContext(schemes=["sha256_crypt", "md5_crypt"])

class AuthService:
    @staticmethod
    def hash_password(pwd:str) -> str:
        return pwd_context.hash(pwd)
    
    @staticmethod
    def verify_password(pwd:str, hash_pwd:str) -> bool:
        return pwd_context.verify(pwd, hash_pwd)

    @staticmethod
    def register(db:Session, payload:Register):
        found_user = db.query(UserModel).filter(UserModel.email == payload.email).first()

        if found_user is not None:
            return JSONResponse(content='this email has already existed', status_code=409)

        db_user = UserModel(
            username = payload.username,
            email = payload.email,
            password = AuthService.hash_password(payload.password)
        )

        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    
    @staticmethod
    def login(db:Session, payload:Login):
        found_user = db.query(UserModel).filter(UserModel.email == payload.email).first()

        if found_user is None:
            return JSONResponse(content='account is invalid', status_code=404)

        check_pwd = AuthService.verify_password(payload.password, found_user.password)
        if check_pwd == False:
            return JSONResponse(content='account is invalid', status_code=400)
        
        user_data = {
            "id":  str(found_user.id),
            "username": found_user.username,
            "email": found_user.email
        }

        access_token = jwt.encode(payload=user_data, key=settings.ACCESS_TOKEN_KEY, algorithm="HS256")
        refresh_token = jwt.encode(payload=user_data, key=settings.REFRESH_TOKEN_KEY, algorithm="HS256")

        response_data = {
            "access_token":access_token,
            "refresh_token":refresh_token
        }
        
        return response_data
    
