from functools import lru_cache
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
import os
from openai import Client


@lru_cache
def get_4o_llm() -> ChatOpenAI:
    return ChatOpenAI(
        model="gpt-4o",
        api_key=os.getenv("OPENAI_API_KEY"),
        temperature=1.0,
    )


@lru_cache
def get_openai_embeddings() -> OpenAIEmbeddings:
    return OpenAIEmbeddings(
        model="text-embedding-3-large",
        api_key=os.getenv("OPENAI_API_KEY"),
    )


@lru_cache
def get_openai_client() -> Client:
    return Client(
        api_key=os.getenv("OPENAI_API_KEY")
    )
