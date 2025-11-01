"""create inital users by party

Revision ID: 4e9c576684c6
Revises: ad7ad684f483
Create Date: 2025-10-31 20:21:04.763629

"""
from typing import Sequence, Union
import uuid

from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes
from app.core.security import get_password_hash
from app.models import PoliticalParties


# revision identifiers, used by Alembic.
revision: str = '4e9c576684c6'
down_revision: Union[str, None] = 'ad7ad684f483'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Initial users data - one superuser per political party
    users = [
        {
            "id": str(uuid.uuid4()),
            "email": f"admin_{party.value.lower()}@email.com",
            "full_name": f"Admin {party.value}",
            "hashed_password": get_password_hash("changethis"),  # Please change this password in production
            "is_superuser": True,
            "political_party": party.name,
            "municipality": None
        }
        for party in PoliticalParties
    ]
    
    # Create users
    op.bulk_insert(
        sa.table(
            'user',
            sa.Column('id', sa.UUID()),
            sa.Column('email', sa.String()),
            sa.Column('full_name', sa.String()),
            sa.Column('hashed_password', sa.String()),
            sa.Column('is_superuser', sa.Boolean()),
            sa.Column('political_party', sa.Enum(PoliticalParties)),
            sa.Column('municipality', sa.Integer()),
        ),
        users
    )


def downgrade() -> None:
    """Downgrade schema."""
    # Remove the created users by their emails
    for party in PoliticalParties:
        email = f"admin_{party.value.lower()}@email.com"
        op.execute(
            sa.text(f"DELETE FROM \"user\" WHERE email = '{email}'")
        )
