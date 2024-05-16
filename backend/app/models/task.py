import uuid

from app.core.database import Base
from sqlalchemy import (
    Column,
    ForeignKey,
    String,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship


class TasModel(Base):
    __tablename__ = "tasks"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    status = Column(String, nullable=False, default="pending")
    owner_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))

    owner = relationship("UserModel", back_populates="tasks")
