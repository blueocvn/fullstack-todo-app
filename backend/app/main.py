from fastapi import FastAPI, Request, Response
from auth import auth
from core.database import engine, Base, SessionLocal
import models

app = FastAPI()

app.include_router(auth.router)

@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    response = Response("Internal server error", status_code=500)
    try:
        request.state.db = SessionLocal()
        response = await call_next(request)
    finally:
        request.state.db.close()
    return response


@app.get("/")
async def root():
    return {"message": "Hello World"}
