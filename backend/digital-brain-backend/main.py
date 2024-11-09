from fastapi import FastAPI
from contextlib import asynccontextmanager
import uvicorn


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Setup code before the application starts

    try:
        yield
    finally:
        # Teardown code after the application stops
        print("Shutting down the application")



app = FastAPI(lifespan=lifespan)

@app.get("/")
async def root():
    return {"message": "Hello, World!"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

