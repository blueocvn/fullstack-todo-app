from sqlalchemy import (
    Column,
    String,
    ForeignKey
)
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid 

from app.core.database import Base

class TaskModel(Base):
    __tablename__ = "tasks"
    
    id = Column(UUID(as_uuid=True),primary_key=True,  default=uuid.uuid4)
    title = Column(String , nullable= False )
    status = Column(String, nullable=False, default= 'pending')
    owner_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    assignee_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    team_id = Column(UUID(as_uuid=True), ForeignKey('teams.id'), nullable=True)

    owner = relationship("UserModel", back_populates="owner_tasks", foreign_keys=[owner_id])
    assignee = relationship("UserModel", back_populates="assignee_tasks", foreign_keys=[assignee_id])
    team = relationship("TeamModel", back_populates="tasks", foreign_keys=[team_id])
