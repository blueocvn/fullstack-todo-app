import enum

from app.core.database import Base
from sqlalchemy import Column, Enum, ForeignKey, Integer, String


class Status(enum.Enum):
    pending = 1
    processing = 2
    complete = 3


class TasModel(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    status = Column(Enum(Status))
    teamMember_id = Column(ForeignKey("team_member.id", ondelete="CASCADE"))
