import os
from dotenv import load_dotenv
from fastapi import FastAPI
from contextlib import asynccontextmanager
import uvicorn
import logging
from langchain import hub
from controllers.micro_learnings import router as micro_learnings_router
from controllers.aloryith_storybuilder import router as aloryith_storybuilder_router
from setup import get_4o_llm
from fastapi.middleware.cors import CORSMiddleware
from controllers.welcome import router as welcome_router

load_dotenv()

logger = logging.getLogger(__name__)

# prompt = hub.pull("aloryith-environment-design")
# user_input = input("Enter a prompt: ")
# llm = get_4o_llm()
# prompt_value = prompt.invoke(user_input)
# result = llm.invoke(prompt_value)
# print(result.content)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting the application")
    app.include_router(micro_learnings_router)
    app.include_router(aloryith_storybuilder_router)
    app.include_router(welcome_router)

    try:

        yield
    finally:
        logger.info("Shutting down the application")


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello, World!"}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8001)
