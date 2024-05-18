from fastapi import FastAPI , Request , Response
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import SessionLocal
from app.api import todo_router

def create_application() -> FastAPI:
    application = FastAPI(title=settings.PROJECT_NAME)
    return application

app = create_application()

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=[settings.CORS_ORIGINS],
    allow_methods=[settings.CORS_METHODS],
    allow_headers=[settings.CORS_HEADERS],
)


app.include_router(todo_router)

@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    response = Response("Internal server error", status_code=500)
    try:
        request.state.db = SessionLocal()
        response = await call_next(request)
    finally:
        request.state.db.close()
    return response