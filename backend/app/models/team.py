from app.core.database import Base
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

from sqlalchemy import (
    Column,
    Integer,
    String,
    Table
)
import uuid

from sqlalchemy.dialects.postgresql import UUID

team_members_association = Table(
    'team_members',
    Base.metadata,
    Column('user_id', UUID(as_uuid=True), ForeignKey('users.id')),
    Column('team_id', UUID(as_uuid=True), ForeignKey('teams.id'))
)

class TeamModel(Base):
    __tablename__ = "teams"

    id=Column(UUID(as_uuid=True),primary_key=True,  default=uuid.uuid4)
    name=Column(String , nullable=False)

    members = relationship("UserModel", secondary=team_members_association, backref="teams")
    tasks = relationship("TeamTaskModel", back_populates="team")

class TeamTaskModel(Base):
    __tablename__ = 'team_tasks'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String)
    status = Column(String, nullable=False, default= 'pending')
    team_id = Column(UUID(as_uuid=True), ForeignKey('teams.id'))

    team = relationship('TeamModel', back_populates='tasks')
