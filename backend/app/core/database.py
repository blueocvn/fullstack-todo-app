from fastapi import Request
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import types, create_engine
from sqlalchemy.dialects.postgresql import TSVECTOR

from app.core.config import settings

DATABASE_URL = settings.POSTGRES_URI

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class TSVector(types.TypeDecorator):
    impl = TSVECTOR
    cache_ok = True

# Dependency
def get_db(request: Request):
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

