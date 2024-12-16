from functools import lru_cache
from langchain_openai import ChatOpenAI
import os


@lru_cache
def get_4o_llm():
    return ChatOpenAI(
        model="gpt-4o",
        api_key=os.getenv("OPENAI_API_KEY"),
        temperature=1.0,
    )
