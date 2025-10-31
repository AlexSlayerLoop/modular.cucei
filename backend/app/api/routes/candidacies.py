from typing import Any

from fastapi import APIRouter, HTTPException, status

from app import crud
from app.api.deps import CurrentUser, SessionDep
from app.models import MunicipalCandidacyBase, MunicipalCandidacyPublic

router = APIRouter(prefix="/candidacies", tags=["candidacies"])


@router.post("/", response_model=MunicipalCandidacyPublic)
def create_candidacy(
    *,
    session: SessionDep,
    candidacy_in: MunicipalCandidacyBase,
    current_user: CurrentUser,
) -> Any:
    """
    Create new municipal candidacy.
    """

    candidacy = crud.get_candidacy_by_position(
        session=session, position=candidacy_in.position, user_id=current_user.id
    )

    if candidacy:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The user already has a candidacy for this position.",
        )
    candidacy = crud.create_candidacy(
        session=session,
        candidacy_create=candidacy_in,
        user_id=current_user.id,
    )
    return candidacy


# TODO:get cadidacy by municipality
# TODO:get cadidacy by user

# TODO:update candidacy
# TODO:delete candidacy
