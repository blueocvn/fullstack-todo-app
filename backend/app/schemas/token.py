from pydantic import BaseModel


class Token(BaseModel):
    username: str
    password: str
    access_token: str
    refresh_token: str
    expires_at: str
    token_type: str
