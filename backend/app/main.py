from fastapi.middleware.cors import CORSMiddleware
from app.api.tasks import task_router as TaskRouter
from fastapi import FastAPI, Request, Response
from app.api.auth import router as AuthRouter
from app.api.users import user_router as UserRouter
from app.api.teams import team_router as TeamRouter
from app.core.database import engine, Base, SessionLocal

def create_application():
    application  = FastAPI()    
    application.include_router(TaskRouter)
    application.include_router(AuthRouter)
    application.include_router(UserRouter)
    application.include_router(TeamRouter)
    return application

app = create_application()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
