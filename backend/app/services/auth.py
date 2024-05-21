import jwt
from app.core.config import settings
from app.models.user import UserModel
from app.schemas.auth import ChangePassword, Login, Register
from fastapi import HTTPException
from fastapi.responses import JSONResponse
from passlib.context import CryptContext
from sqlalchemy.orm import Session

pwd_context = CryptContext(schemes=["sha256_crypt", "md5_crypt"])


class AuthService:
    @staticmethod
    def hash_password(pwd: str) -> str:
        return pwd_context.hash(pwd)

    @staticmethod
    def verify_password(pwd: str, hash_pwd: str) -> bool:
        return pwd_context.verify(pwd, hash_pwd)

    @staticmethod
    def register(db: Session, payload: Register):
        found_user = (
            db.query(UserModel).filter(UserModel.email == payload.email).first()
        )

        if found_user is not None:
            return JSONResponse(
                content="this email has already existed", status_code=409
            )

        db_user = UserModel(
            username=payload.username,
            email=payload.email,
            password=AuthService.hash_password(payload.password),
        )

        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user

    @staticmethod
    def login(db: Session, payload: Login):
        found_user = (
            db.query(UserModel).filter(UserModel.email == payload.email).first()
        )

        if found_user is None:
            return JSONResponse(content="account is invalid", status_code=404)

        check_pwd = AuthService.verify_password(payload.password, found_user.password)
        if check_pwd == False:
            return JSONResponse(content="account is invalid", status_code=400)

        user_data = {
            "id": str(found_user.id),
            "username": found_user.username,
            "email": found_user.email,
        }

        access_token = jwt.encode(
            payload=user_data, key=settings.ACCESS_TOKEN_KEY, algorithm="HS256"
        )
        refresh_token = jwt.encode(
            payload=user_data, key=settings.REFRESH_TOKEN_KEY, algorithm="HS256"
        )

        response_data = {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "username": found_user.username,
            "email": found_user.email,
            "id":found_user.id
        }

        return response_data

    @staticmethod
    def change_password(db: Session, payload: ChangePassword, user: dict):
        try:
            user_id = user.get("id")

            found_user = db.query(UserModel).filter(UserModel.id == user_id).first()
            if found_user is None:
                return JSONResponse(content="user not found", status_code=404)

            check_pwd = AuthService.verify_password(
                payload.old_password, found_user.password
            )
            if check_pwd == False:
                return JSONResponse(content="password is invalid", status_code=400)

            new_pwd = AuthService.hash_password(payload.new_password)

            found_user.password = new_pwd
            db.commit()
            db.refresh(found_user)

            return JSONResponse(
                content="password has been changed successfully", status_code=200
            )
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=500, detail="Internal server error")
