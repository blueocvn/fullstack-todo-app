from sqlalchemy import Column, Integer, String, Boolean, DateTime
from app.core.database import Base
from sqlalchemy.orm import relationship
from app.models.tasks import Task
from sqlalchemy.ext.declarative import declarative_base
# Base = declarative_base()
class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    dob = Column(DateTime, nullable=True)
    gender = Column(Boolean, nullable=True)
    phone = Column(String, nullable=True)
    address= Column(String, nullable=True)
    tasks = relationship("Task")
   