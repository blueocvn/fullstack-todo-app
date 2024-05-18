from fastapi import Request

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from .config import settings

# create engine object to connect to database
engine = create_engine(settings.POSTGRES_URI)

# create sessionmaker object to generate session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# create Base object to use for models
Base = declarative_base()

# ceate function to response session object
def get_db(request:Request):
    return request.state.db
