from fastapi import FastAPI
from contextlib import asynccontextmanager
import uvicorn
import logging
from controllers import router as micro_learnings_router

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting the application")
    app.include_router(micro_learnings_router)

    try:

        yield
    finally:
        logger.info("Shutting down the application")


app = FastAPI(lifespan=lifespan)


@app.get("/")
async def root():
    return {"message": "Hello, World!"}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8001)

