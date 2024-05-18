from sqlalchemy import (Column,String, ForeignKey)
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID

import uuid
    
from app.core.database import Base
from .team_user import team_user

class TeamModel(Base):
    __tablename__ = "teams"

    id = Column(UUID(as_uuid=True),primary_key=True, default=uuid.uuid4)
    name = Column(String , nullable=False , unique=True)
    leader_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)

    leader = relationship('UserModel', backref='leading_teams')
    members = relationship('UserModel', secondary=team_user, back_populates="teams")
    tasks = relationship('TaskModel', back_populates='team', foreign_keys='TaskModel.team_id')
    

