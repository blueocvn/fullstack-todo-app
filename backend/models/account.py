from sqlalchemy import Column, Integer, String, ForeignKey
from core.database import Base
class Account(Base):
    __tablename__ = 'accounts'
    id = Column(Integer, primary_key=True)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False, unique=True)

  
