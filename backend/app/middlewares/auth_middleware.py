from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer
from jwt import PyJWTError, decode
from app.core.config import settings  # Thay đổi tên module theo cấu trúc dự án của bạn

class JWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super().__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        auth_header = request.headers.get("Authorization")
        credentials_exception = HTTPException(
            status_code=401,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
        if auth_header is None:
            if self.auto_error:
                raise credentials_exception
            else:
                return None

        scheme, token = auth_header.split()
        if scheme.lower() != "bearer":
            raise credentials_exception

        try:
            payload = decode(token, settings.ACCESS_TOKEN_KEY, algorithms=["HS256"])
        except PyJWTError:
            raise credentials_exception

        return payload
