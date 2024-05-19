from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse

from app.schemas.task import CreateTask
from app.models.user import UserModel
from app.models.task import TaskModel
from app.core.config import settings

class TaskService:
    @staticmethod
    def create(db: Session, payload:CreateTask, user:dict):
        user_id = user.get('id')

        found_user = db.query(UserModel).filter(UserModel.id == user_id).first()
        if found_user is None:
            return JSONResponse(content="user not found", status_code=404)
        
        new_task = TaskModel(
            title = payload.title,
            owner_id = found_user.id,
            assignee_id = found_user.id,
            team_id = payload.team_id
        )

        db.add(new_task)
        db.commit()
        db.refresh(new_task)
        return new_task
    
