from fastapi import APIRouter

router = APIRouter(prefix="/micro-learnings", tags=["micro-learnings"])


@router.get("")
async def get_micro_learnings(user_input: str):
    return {"message": "Hello, World!"}
