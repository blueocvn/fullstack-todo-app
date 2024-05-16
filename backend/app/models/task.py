import enum
from app.core.database import Base

from sqlalchemy import (
    Column,
    String,
    Integer,
    ForeignKey,
    Enum
)
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid

# class Status(enum.Enum):
#     pending = 1
#     processing = 2
#     complete = 3
    

class TaskModel(Base):
    __tablename__ = "tasks"
    
    id = Column(UUID(as_uuid=True),primary_key=True,  default=uuid.uuid4)
    title = Column(String , nullable= False )
    status = Column(String, nullable=False, default= 'pending')
    owner_id = Column(UUID(as_uuid=True), ForeignKey('users.id'))

    owner = relationship("UserModel", back_populates="tasks")
