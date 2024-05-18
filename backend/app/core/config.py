from pydantic_settings import BaseSettings
from dotenv import load_dotenv
import os

load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = "TODO APP"
    POSTGRES_URI: str = os.getenv('POSTGRES_URI')
    POSTGRES_POOL_SIZE: int = 20

    CORS_ORIGINS: str = "http://localhost:3000"
    CORS_METHODS: str = "*"
    CORS_HEADERS: str = "*"

    ACCESS_TOKEN_KEY: str = "access_token_key"
    REFRESH_TOKEN_KEY: str = "refresh_token_key"

settings = Settings()