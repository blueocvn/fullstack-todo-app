from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from app.core.database import Base
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from .teams import Team
class Task(Base):
    __tablename__ = 'tasks'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    description = Column(String,nullable=False)
    status = Column(String, nullable=False,default="pending")
    createAt = Column(DateTime, nullable=True)
    updateAt = Column(DateTime, nullable=True)
    dueDate = Column(DateTime, nullable=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=True)
    team_id = Column(Integer, ForeignKey('teams.id'), nullable=True)
    user = relationship("User", foreign_keys=user_id, back_populates="tasks")
    team = relationship("Team", foreign_keys=team_id, back_populates="tasks")