from sqlalchemy import Column, Integer, String, DateTime
from app.core.database import Base
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
# Base = declarative_base()
class Team(Base):
    __tablename__ = 'teams'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False, unique=True)
    createAt = Column(DateTime, nullable=True)
    updateAt = Column(DateTime, nullable=True)
    tasks = relationship("Task", back_populates="team")
    