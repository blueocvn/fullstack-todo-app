from app.core.database import Base

from sqlalchemy import (
    String,
    Integer,
    Column,
    ForeignKey
)

class TeamMemberModel(Base):
    __tablename__ = "team_member"
    
    id = Column(Integer , primary_key=True)
    team_id = Column(ForeignKey("teams.id" , ondelete="CASCADE"))
    leader_id = Column(ForeignKey("users.id" , ondelete="CASCADE"))
    member_id = Column(ForeignKey("users.id" , ondelete="CASCADE"))