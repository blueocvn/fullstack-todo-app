from sqlalchemy import Column, Integer, String, DateTime
from core.database import Base
class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False, unique=True)
    createAt = Column(DateTime, nullable=True)
    updateAt = Column(DateTime, nullable=True)

   