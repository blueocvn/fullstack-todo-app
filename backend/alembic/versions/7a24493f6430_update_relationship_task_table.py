"""update relationship task table

Revision ID: 7a24493f6430
Revises: fa8bfd0f6cb0
Create Date: 2024-05-21 14:12:09.008595

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '7a24493f6430'
down_revision: Union[str, None] = 'fa8bfd0f6cb0'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('tasks', 'description',
               existing_type=sa.VARCHAR(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('tasks', 'description',
               existing_type=sa.VARCHAR(),
               nullable=True)
    # ### end Alembic commands ###