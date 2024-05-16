from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "TODO APP"
    POSTGRES_URI: str = "postgresql://postgres:26052003@localhost:5432/todo_list"
    POSTGRES_POOL_SIZE: int = 20

    CORS_ORIGINS: str = "http://localhost:3000"
    CORS_METHODS: str = "*"
    CORS_HEADERS: str = "*"

    ACCESS_TOKEN_EXPIRE: int = 7200000
    REFRESS_TOKEN_EXPIRE: int = 3600000
    SECRET_KEY: str = "todoapp!"
    ALGORITHM: str = "HS256"


settings = Settings()
