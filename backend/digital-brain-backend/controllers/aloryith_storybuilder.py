from fastapi import APIRouter

aloryith_storybuilder_router = APIRouter()


@aloryith_storybuilder_router.post("/generate-story")
async def generate_story(request: str):
    pass
