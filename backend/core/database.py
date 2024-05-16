from fastapi import Request
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import types
from sqlalchemy.dialects.postgresql import TSVECTOR

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=False)

Base = declarative_base()

class TSVector(types.TypeDecorator):
    impl = TSVECTOR
    cache_ok = True

# Dependency
def get_db(request: Request):
    return request.state.db
