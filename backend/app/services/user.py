from app.core.config import settings
from app.core.database import get_db
from app.models.user import UserModel
from app.schemas.user import CreateUser, LoginUser
from app.utils.errors import APIException, ErrorCodes
from fastapi import Depends
from fastapi import status as HTTPStatusCode
from jose import jwt
from sqlalchemy.orm import Session


class AuthService:
    def register(payload: CreateUser, db: Session = Depends(get_db)):
        db_user = (
            db.query(UserModel).filter(payload.username == UserModel.username).first()
        )

        if db_user:
            raise APIException(
                status_code=HTTPStatusCode.HTTP_409_CONFLICT,
                detail=ErrorCodes.APP_USER_ALREADY_EXIT,
            )

        create_user_model = UserModel(
            username=payload.username,
            password=payload.password,
        )

        db.add(create_user_model)
        db.commit()

    def login(payload: LoginUser, db: Session = Depends(get_db)):
        db_user = (
            db.query(UserModel)
            .filter(UserModel.username == payload.username)
            .filter(UserModel.password == payload.password)
            .first()
        )

        if db_user is None or db_user.password is None:
            raise APIException(
                status_code=HTTPStatusCode.HTTP_409_CONFLICT,
                detail=ErrorCodes.APP_WRONG_USERNAME_OR_PASSWORD,
            )

        access_token_expires_at = settings.ACCESS_TOKEN_EXPIRE
        access_token = jwt.encode(
            {
                "username": db_user.username,
                "exp": access_token_expires_at,
            },
            settings.SECRET_KEY,
            algorithm=settings.ALGORITHM,
        )

        refresh_token_expires_at = settings.REFRESS_TOKEN_EXPIRE
        refresh_token = jwt.encode(
            {
                "username": db_user.username,
                "exp": refresh_token_expires_at,
            },
            settings.SECRET_KEY,
            algorithm=settings.ALGORITHM,
        )

        db.commit()
        return {
            "username": db_user.username,
            "access_token": access_token,
            "refresh_token": refresh_token,
        }
