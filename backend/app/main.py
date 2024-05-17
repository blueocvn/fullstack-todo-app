from fastapi.middleware.cors import CORSMiddleware
from app.api.task import task_router as TaskRouter
from fastapi import FastAPI, Request, Response
from auth import auth
from core.database import engine, Base, SessionLocal
import models

def create_application():
    application  = FastAPI()    
    application.include_router(TaskRouter)
    app.include_router(auth.router)
    return application

app = create_application()

app.add_middleware(
    CORSMiddleware
)


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
