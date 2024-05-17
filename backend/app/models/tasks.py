from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from core.database import Base
class Task(Base):
    __tablename__ = 'tasks'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False, unique=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False, unique=True)
    team_id = Column(Integer, ForeignKey('teams.id'), nullable=False, unique=True)
    status = Column(Integer, nullable=False, unique=True)
    createAt = Column(DateTime, nullable=True)
    updateAt = Column(DateTime, nullable=True)