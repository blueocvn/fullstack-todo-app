"""Create table full

Revision ID: 189e85c8c359
Revises: bff731de19cc
Create Date: 2024-05-15 11:41:57.611282

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '189e85c8c359'
down_revision: Union[str, None] = 'bff731de19cc'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    op.create_table(
        "user_team",
        sa.Column("user_id", sa.Integer, sa.ForeignKey("users.id")),
        sa.Column("team_id", sa.Integer, sa.ForeignKey("teams.id"))
    )
    op.create_table(
        "accounts",
        sa.Column("email", sa.String(50), nullable=False),
        sa.Column("password", sa.String(50), nullable=False),
        sa.Column("user_id", sa.Integer, sa.ForeignKey("users.id"))
    )
    op.create_table(
        "tasks",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("name", sa.String(50), nullable=False),
        sa.Column("user_id", sa.Integer, sa.ForeignKey("users.id")),
        sa.Column("team_id", sa.Integer, sa.ForeignKey("teams.id")),
        sa.Column("status", sa.Integer),
        sa.Column("createAt", sa.Date),
        sa.Column("updateAt", sa.Date)
    )

def downgrade() -> None:
    op.drop_table("user_team")
    op.drop_table("accounts")
    op.drop_table("tasks")
