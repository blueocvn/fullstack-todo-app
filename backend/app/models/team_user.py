from sqlalchemy import Table, Column, ForeignKey
from sqlalchemy.dialects.postgresql import UUID


from app.core.database import Base

team_user = Table(
    'user_team',
    Base.metadata,
    Column('user_id', UUID(as_uuid=True), ForeignKey('users.id'), primary_key=True),
    Column('team_id', UUID(as_uuid=True), ForeignKey('teams.id'), primary_key=True)
)