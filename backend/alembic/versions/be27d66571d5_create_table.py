"""create table

Revision ID: be27d66571d5
Revises: 
Create Date: 2024-05-15 21:15:36.590490

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'be27d66571d5'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('teams',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('password', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    op.create_table('team_member',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('team_id', sa.Integer(), nullable=True),
    sa.Column('leader_id', sa.UUID(), nullable=True),
    sa.Column('member_id', sa.UUID(), nullable=True),
    sa.ForeignKeyConstraint(['leader_id'], ['users.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['member_id'], ['users.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['team_id'], ['teams.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tasks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('status', sa.Enum('pending', 'processing', 'complete', name='status'), nullable=True),
    sa.Column('teamMember_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['teamMember_id'], ['team_member.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tasks')
    op.drop_table('team_member')
    op.drop_table('users')
    op.drop_table('teams')
    # ### end Alembic commands ###
