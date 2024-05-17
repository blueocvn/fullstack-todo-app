from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.task import task_router as TaskRouter

def create_application():
    application  = FastAPI()    
    application.include_router(TaskRouter)
    return application

app = create_application()

app.add_middleware(
    CORSMiddleware
)

@app.get("/")
async def root():
    return {"message": "Hello World"}
