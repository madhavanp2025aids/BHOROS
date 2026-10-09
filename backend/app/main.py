import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import endpoints
from app.db_init import init_db

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Automatically create database tables and seed if empty on application startup
    init_db()
    yield

app = FastAPI(
    title="BHOROS API",
    description="Backend API for Baghewala Heavy Oil Recovery Optimization System",
    version="1.0.0",
    lifespan=lifespan,
)

# Configure CORS origins from environment or fallback to localhost + wildcard
raw_origins = os.getenv("ALLOWED_ORIGINS", "*")
if raw_origins == "*":
    allowed_origins = ["*"]
else:
    # Parse comma-separated list and always include localhost for local development
    default_dev_origins = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ]
    parsed_origins = [origin.strip() for origin in raw_origins.split(",") if origin.strip()]
    allowed_origins = list(set(parsed_origins + default_dev_origins))

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(endpoints.router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Welcome to the BHOROS API"}
