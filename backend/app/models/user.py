from sqlalchemy import Column, Integer, String, Boolean, DateTime
from app.core.database import Base
class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    DOB = Column(DateTime, nullable=True)
    Gender = Column(Boolean, nullable=True)
    Phone = Column(String, nullable=True)
    Address= Column(String, nullable=True)
   