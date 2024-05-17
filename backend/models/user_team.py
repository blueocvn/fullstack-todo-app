from sqlalchemy import Column, Integer, ForeignKey
from core.database import Base
class User_team(Base):
    __tablename__ = 'user_team'
    user_id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    team_id = Column(Integer, ForeignKey('teams.id'), primary_key=True)
    