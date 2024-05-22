from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.models.tasks import Task
from app.schemas.tasks import Task as schemaTask

from app.core.config import settings

SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES

credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)

class TaskService:
    def get_tasks(db: Session):
        tasks = db.query(Task).all()
        return {"status": 200, "data": tasks}

    def create_new_task(task: schemaTask, token: str, db : Session):
        newTask = Task(
            name = task.name,
            status = task.status,
            
        )

        db.add(task)
        db.commit()
        db.refresh(task)
        return