from fastapi import Request
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

POSTGRES_URI: str = "postgresql://postgres:26052003@localhost:5432/todo_list"


engine = create_engine(POSTGRES_URI)


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


Base = declarative_base()


def get_db(request: Request):
    return request.state.db
