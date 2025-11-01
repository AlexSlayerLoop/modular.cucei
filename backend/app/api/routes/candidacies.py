from typing import Any

from fastapi import APIRouter, HTTPException, status

from app import crud
from app.api.deps import CurrentUser, SessionDep
from app.models import (
    CandidacyPublicWithPersonalInfo,
    CandidacyWithPersonalInfoCreate,
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
    candidacy = crud.get_current_user_candidacy_by_position(
        session=session,
        position=candidacy_in.municipal_candidacy.position,
        user_id=current_user.id,
    )
    if candidacy:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The user already has a candidacy for this position.",
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
# TODO:get cadidacy by user

# TODO:update candidacy
# TODO:delete candidacy
