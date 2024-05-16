from app.core.database import Base

from sqlalchemy import (
    Column,
    Integer,
    String
    
)

class TeamModel(Base):
    __tablename__ = "teams"

    id=Column(Integer,primary_key=True)
    name=Column(String , nullable=False)

