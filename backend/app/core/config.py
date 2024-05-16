from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "TODO APP"
    POSTGRES_URI: str = "postgresql://postgres:26052003@localhost:5432/todoapp_local"
    POSTGRES_POOL_SIZE: int = 20

    CORS_ORIGINS: str = "http://localhost:3000"
    CORS_METHODS: str = "*"
    CORS_HEADERS: str = "*"

settings = Settings()