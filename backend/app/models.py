import uuid
from enum import Enum

from pydantic import EmailStr
from sqlmodel import Field, SQLModel


class PartyEnum(str, Enum):
    MORENA = "MORENA"
    PAN = "PAN"
    PRI = "PRI"
    PRD = "PRD"
    PT = "PT"
    MC = "MC"
    PVEM = "PVEM"


# Shared properties | Political party model
class UserBase(SQLModel):
    email: EmailStr = Field(index=True, unique=True, max_length=255)
    full_name: str | None = Field(default=None, index=True, max_length=255)
    is_superuser: bool = False
    municipality: int | None = Field(default=None, gt=1, le=125)
    party_name: PartyEnum


# Database model, database table inferred from class name
class User(UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_password: str


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
    email: EmailStr | None = Field(default=None, max_length=255)  # type: ignore
    password: str | None = Field(default=None, min_length=8, max_length=40)


class UserUpdateMe(SQLModel):
    full_name: str | None = Field(default=None, max_length=255)
    email: EmailStr | None = Field(default=None, max_length=255)


class UpdatePassword(SQLModel):
    current_password: str = Field(min_length=8, max_length=40)
    new_password: str = Field(min_length=8, max_length=40)


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
