from sqlalchemy import Column, Integer, ForeignKey
from app.core.database import Base
from sqlalchemy.orm import relationship
class User_team(Base):
    __tablename__ = 'user_team'
    user_id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    team_id = Column(Integer, ForeignKey('teams.id'), primary_key=True)
    # user = relationship("User", back_populates="teams")
    # team = relationship("Team", back_populates="users")