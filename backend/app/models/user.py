from app.core.database import Base

from sqlalchemy.orm import relationship

from sqlalchemy import (
    Column,
    String
)
from sqlalchemy.dialects.postgresql import UUID
import uuid
    

class UserModel(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True),primary_key=True, default=uuid.uuid4)
    username = Column(String , nullable=False , unique=True)
    password = Column(String , nullable=False)

    tasks = relationship('TaskModel', back_populates='owner')


