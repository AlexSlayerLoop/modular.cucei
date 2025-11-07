import uuid
from typing import Any

from fastapi import APIRouter, HTTPException, status
from sqlmodel import select

from app import crud
from app.api.deps import CurrentUser, SessionDep
from app.models import (
    CandidacyPublicWithPersonalInfo,
    CandidacyWithPersonalInfoCreate,
    MunicipalCandidacy,
    User,
)

router = APIRouter(prefix="/candidacies", tags=["candidacies"])


@router.post("/", response_model=CandidacyPublicWithPersonalInfo)
def create_candidacy(
    *,
    session: SessionDep,
    candidacy_in: CandidacyWithPersonalInfoCreate,
    current_user: CurrentUser,
) -> Any:
    """
    Create new municipal candidacy.
    """
    statement = (
        select(MunicipalCandidacy)
        .join(User)
        .where(
            MunicipalCandidacy.position == candidacy_in.municipal_candidacy.position,
            MunicipalCandidacy.municipality
            == candidacy_in.municipal_candidacy.municipality,
            User.political_party == current_user.political_party,
        )
    )
    candidacy = session.exec(statement).first()
    if candidacy:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Esta candidatura ya existe para este puesto",
        )
    candidacy = crud.create_candidacy(
        session=session,
        candidacy_create=candidacy_in.municipal_candidacy,
        user_id=current_user.id,
    )
    _ = crud.create_personal_info(
        session=session,
        municipal_candidacy_id=candidacy.id,
        personal_info_in=candidacy_in.candidate_personal_info,
    )
    return candidacy


# TODO:get cadidacy by municipality
# if the user is an admin, they can see all candicacies for a municipality
@router.get("/", response_model=list[CandidacyPublicWithPersonalInfo])
def get_candidacies(
    *, session: SessionDep, current_user: CurrentUser, municipality: int
) -> Any:
    """
    Get municipal candidacies for the current user's political party in a given
    municipality.
    """
    statement = (
        select(MunicipalCandidacy)
        .join(User)
        .where(
            User.political_party == current_user.political_party,
            MunicipalCandidacy.municipality == municipality,
        )
    )
    candidacies = session.exec(statement).all()

    return candidacies


# TODO:get cadidacy by user
@router.get("/{candidacy_id}", response_model=CandidacyPublicWithPersonalInfo)
def get_candidacy_by_id(*, session: SessionDep, candidacy_id: uuid.UUID) -> Any:
    """
    Get municipal candidacy by ID.
    """
    candidacy = session.get(MunicipalCandidacy, candidacy_id)
    return candidacy


# TODO:update candidacy
# TODO:delete candidacy
