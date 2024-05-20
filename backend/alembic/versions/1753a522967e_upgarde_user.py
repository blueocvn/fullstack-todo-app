"""Upgarde User

Revision ID: 1753a522967e
Revises: fcc85ef517ce
Create Date: 2024-05-17 14:08:35.085643

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1753a522967e'
down_revision: Union[str, None] = 'fcc85ef517ce'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.drop_column('users', 'createAt')
    op.drop_column('users', 'updateAt')
    op.add_column('users', sa.Column('dob', sa.DateTime(), nullable=True))
    op.add_column('users', sa.Column('gender', sa.Boolean(), nullable=True))
    op.add_column('users', sa.Column('phone', sa.String(), nullable=True))
    op.add_column('users', sa.Column('address', sa.String(), nullable=True))
def downgrade() -> None:
    op.add_column('users', sa.Column('createAt', sa.DateTime(), nullable=True))
    op.add_column('users', sa.Column('updateAt', sa.DateTime(), nullable=True))
    op.drop_column('users', 'DOB')
    op.drop_column('users', 'Gender')
    op.drop_column('users', 'Phone')
    op.drop_column('users', 'Address')