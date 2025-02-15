from fastapi import APIRouter
import logging
from agents.ideation.convergence import convergence_thinking
from agents.ideation.divergence import divergence_thinking
from agents.ideation.catalyst import catalyst_thinking
from models.UserQuery import UserQuery

router = APIRouter()

logger = logging.getLogger(__name__)

@router.post("/ideation")
async def get_ideation(user_input: UserQuery):
    try:
        convergence_response = convergence_thinking(user_input.content)
        divergence_response = divergence_thinking(user_input.content)


        catalyst_response = catalyst_thinking(user_input.content, convergence_response, divergence_response)

        logger.info(f"Convergence response: {convergence_response}")
        logger.info(f"Divergence response: {divergence_response}")
        logger.info(f"Catalyst response: {catalyst_response}")

        return catalyst_response
    except Exception as e:
        logger.error(f"Error in get_ideation: {e}")
        return {"error": str(e)}

