from sqlalchemy.orm import Session
from fastapi import HTTPException
from fastapi.responses import JSONResponse

from app.schemas.task import CreateTask, UpdateTask
from app.models.user import UserModel
from app.models.task import TaskModel
from app.core.config import settings

class TaskService:
    @staticmethod
    def create(db: Session, payload:CreateTask, user:dict):
        try:
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
        except Exception as e:
            print("11111: ", e)
            db.rollback()
            raise HTTPException(status_code=500, detail="Internal server error")
    
    @staticmethod
    def update(db: Session, payload:UpdateTask, user:dict):
        try:
            user_id = user.get('id')

            found_task = db.query(TaskModel).filter(
                    TaskModel.id == payload.id,
                    TaskModel.owner_id == user_id
                ).first()
            if found_task is None:
                return JSONResponse(content="task not found", status_code=404)
            
            update_data = payload.dict(exclude_unset=True)
            for key, value in update_data.items():
                setattr(found_task, key, value)
            
            db.commit()
            db.refresh(found_task)
            return found_task
        except Exception as e:
            raise HTTPException(status_code=500, detail="Internal server error")