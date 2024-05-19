import uuid

from app.core.database import Base
from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from .team_user import team_user


class UserModel(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String, nullable=False, unique=True)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)

    teams = relationship("TeamModel", secondary=team_user, back_populates="members")
    owner_tasks = relationship(
        "TaskModel", back_populates="owner", foreign_keys="TaskModel.owner_id"
    )
    assignee_tasks = relationship(
        "TaskModel", back_populates="assignee", foreign_keys="TaskModel.assignee_id"
    )

    tasks = relationship("TaskModel", back_populates="owner")
