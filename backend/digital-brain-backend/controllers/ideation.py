from fastapi import APIRouter
from agents.ideation.convergence import convergence_thinking
from agents.ideation.divergence import divergence_thinking
from agents.ideation.catalyst import catalyst_thinking

router = APIRouter(prefix="/ideation", tags=["ideation"])


@router.get("")
async def get_ideation(user_input: str):
    convergence_response = convergence_thinking(user_input)
    divergence_response = divergence_thinking(user_input)
    catalyst_response = catalyst_thinking(user_input, convergence_response, divergence_response)

    return catalyst_response
