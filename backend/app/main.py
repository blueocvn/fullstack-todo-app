from app.apis import user_router
from app.apis.todo import todo_router
from app.core.config import settings
from app.core.database import SessionLocal
from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware


def create_application() -> FastAPI:
    application = FastAPI(title=settings.PROJECT_NAME)
    application.include_router(user_router)
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
