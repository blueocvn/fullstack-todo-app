"""Create table base

Revision ID: bff731de19cc
Revises: 
Create Date: 2024-05-15 11:38:24.728154

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'bff731de19cc'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("name", sa.String(50), nullable=False),
        sa.Column("createAt", sa.Date),
        sa.Column("updateAt", sa.Date)
    )
    op.create_table(
        "teams",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("name", sa.String(50), nullable=False),
        sa.Column("createAt", sa.Date),
        sa.Column("updateAt", sa.Date)
    )

def downgrade() -> None:
    op.drop_table("users")
    op.drop_table("teams")