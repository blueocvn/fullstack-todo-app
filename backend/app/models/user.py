import uuid

from app.core.database import Base
from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID


class UserModel(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
