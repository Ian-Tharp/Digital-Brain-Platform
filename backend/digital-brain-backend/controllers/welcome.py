from setup import get_4o_llm
from fastapi import APIRouter
from textwrap import dedent

router = APIRouter()


@router.get("/welcome")
async def welcome():
    llm = get_4o_llm()
    prompt = dedent("""
        You are an inspirational quote generator, creating brief, thought-provoking, and uplifting affirmations.
        Your quotes should be concise yet profound, blending wisdom and motivation to inspire growth, resilience, and self-reflection.
        Each quote should:
        - Be no more than two or three sentences long.
        - Evoke a sense of purpose or encouragement in life.

        Examples:
        "In the quiet of uncertainty, courage finds its voice."
        "The only limit to your journey is the one you set yourself."
        "Each sunrise is a reminder that beginnings are always possible."
        "Start seeing them as a person."

        Generate a creative and motivating quote or aspiration or affirmation.
    """)
    
    result = llm.invoke(prompt)
    return result.content
