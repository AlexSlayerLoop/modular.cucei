import datetime
import uuid
from enum import Enum

from pydantic import EmailStr
from sqlalchemy.orm import RelationshipProperty
from sqlmodel import Field, Relationship, SQLModel


class PoliticalParties(Enum):
    mc = "MC"
    morena = "MORENA"
    pan = "PAN"
    prd = "PRD"
    pri = "PRI"
    pt = "PT"


# Shared properties | Political party model
class UserBase(SQLModel):
    political_party: PoliticalParties | None = Field(default=None)
    email: EmailStr = Field(index=True, unique=True, max_length=255)
    full_name: str | None = Field(default=None, index=True, max_length=255)
    is_superuser: bool = False
    municipality: int | None = Field(default=None, ge=1, le=125)


# Database model, database table inferred from class name
class User(UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_password: str

    municipal_candidacies: list["MunicipalCandidacy"] = Relationship(  # pyright: ignore[reportAny]
        back_populates="user", cascade_delete=True
    )


# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=40)


# Properties to return via API, id is always required
class UserPublic(UserBase):
    id: uuid.UUID


class UsersPublic(SQLModel):
    data: list[UserPublic]
    count: int


# Properties to receive via API on update, all are optional
class UserUpdate(UserBase):
    email: EmailStr | None = Field(default=None, max_length=255)
    password: str | None = Field(default=None, min_length=8, max_length=40)


class UserUpdateMe(SQLModel):
    full_name: str | None = Field(default=None, max_length=255)
    email: EmailStr | None = Field(default=None, max_length=255)


class UpdatePassword(SQLModel):
    current_password: str = Field(min_length=8, max_length=40)
    new_password: str = Field(min_length=8, max_length=40)


class PoliticalPosition(Enum):
    presidente = "Presidente"
    sindico = "Sindico"
    regidor = "Regidor"


class MunicipalCandidacyBase(SQLModel):
    political_position: PoliticalPosition
    position: int = Field(gt=0, le=12)
    municipality: int = Field(ge=1, le=125)


class MunicipalCandidacy(MunicipalCandidacyBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)

    user_id: uuid.UUID = Field(foreign_key="user.id", ondelete="CASCADE")
    user: User = Relationship(  # pyright: ignore[reportAny]
        back_populates="municipal_candidacies",
    )

    candidate_personal_info: "CandidatePersonalInfo" = Relationship(  # pyright: ignore[reportAny]
        sa_relationship=RelationshipProperty(
            "CandidatePersonalInfo", back_populates="municipal_candidacy", uselist=False
        )
    )


class genderEnum(str, Enum):
    M = "M"
    H = "H"


class CandidatePersonalInfoBase(SQLModel):
    full_name: str = Field(max_length=255)
    birthdate: datetime.date
    gender: genderEnum
    state_of_residence: int = Field(ge=1, le=32)
    municipality_of_residence: int = Field(ge=1, le=125)
    curp: str = Field(min_length=18, max_length=18)
    ine_valid_until: datetime.date
    ine_clave_elector: str = Field(min_length=18, max_length=18)
    is_public_servant: bool
    ocupation: str = Field(max_length=255)
    # rfc, phone number, address, etc.


class CandidatePersonalInfo(CandidatePersonalInfoBase, table=True):
    id: uuid.UUID = Field(
        default_factory=uuid.uuid4,
        primary_key=True,
        index=True,
        nullable=False,
    )
    municipal_candidacy_id: uuid.UUID = Field(
        foreign_key="municipalcandidacy.id",
        ondelete="CASCADE",
        unique=True,
        nullable=False,
    )
    municipal_candidacy: MunicipalCandidacy = Relationship(  # pyright: ignore[reportAny]
        back_populates="candidate_personal_info"
    )


# Generic message
class Message(SQLModel):
    message: str


# JSON payload containing access token
class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"


# Contents of JWT token
class TokenPayload(SQLModel):
    sub: str | None = None
