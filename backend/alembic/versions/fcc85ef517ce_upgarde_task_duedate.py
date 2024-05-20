"""Upgarde Task DueDate

Revision ID: fcc85ef517ce
Revises: e162ce9e6b70
Create Date: 2024-05-17 11:45:05.675345

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'fcc85ef517ce'
down_revision: Union[str, None] = 'e162ce9e6b70'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('tasks', sa.Column('dueDate', sa.DateTime(), nullable=True))

def downgrade() -> None:
    op.drop_column('tasks', 'dueDate')
