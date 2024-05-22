from sqlalchemy.orm import Session
from fastapi import HTTPException
from fastapi.responses import JSONResponse
from uuid import UUID

from app.schemas.task import CreateTask, UpdateTask, ChangeTaskStatus, AssignTask
from app.models.user import UserModel
from app.models.task import TaskModel
from app.models.team import TeamModel
from app.core.config import settings
from app.utils.enums import TaskStatus

class TaskService:
    @staticmethod
    def get_all_tasks_by_user(db: Session, user:dict):
        try:
            user_id = user.get('id')

            tasks = db.query(TaskModel).filter(
                    TaskModel.owner_id == user_id,
                    TaskModel.assignee_id == user_id,
                    TaskModel.team_id == None
                ).all()
            
            return tasks
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=500, detail="Internal server error")
    
    @staticmethod
    def get_one_task(db: Session, task_id:UUID, user:dict):
        try:
            user_id = user.get('id')

            found_task = db.query(TaskModel).filter(
                    TaskModel.id == task_id,
                ).first()
            if found_task is None:
                return JSONResponse(content="task not found", status_code=404)
            
            found_team = db.query(TeamModel).filter(
                TeamModel.id == found_task.team_id
                ).first()
            if found_team is None:
                return JSONResponse(content="team not found", status_code=404)
            
            if user_id != str(found_team.leader_id) and not any(str(member.id) == user_id for member in found_team.members):
                return JSONResponse(content="you are not team's member", status_code=403)
            
            found_task.assignee_name = found_task.assignee.username
            found_task.leader_name = found_task.owner.username
            found_task.team_name = found_task.team.name
            return found_task
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=500, detail="Internal server error")

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
            db.rollback()
            raise HTTPException(status_code=500, detail="Internal server error")
    
    @staticmethod
    def update(db: Session, task_id:UUID, payload:UpdateTask, user:dict):
        try:
            user_id = user.get('id')

            found_task = db.query(TaskModel).filter(
                    TaskModel.id == task_id,
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
        
    @staticmethod
    def change_task_status(db: Session, task_id:str, payload:ChangeTaskStatus, user:dict):
        try:
            user_id = user.get('id')

            found_task = db.query(TaskModel).filter(
                    TaskModel.id == task_id,
                    TaskModel.assignee_id == user_id
                ).first()
            if found_task is None:
                return JSONResponse(content="task not found", status_code=404)
            
            found_task.status = payload.status
            
            db.commit()
            db.refresh(found_task)
            return found_task
        except Exception as e:
            raise HTTPException(status_code=500, detail="Internal server error")
        
    @staticmethod
    def assign_task(db: Session, task_id:str, payload:AssignTask, user:dict):
        try:
            user_id = user.get('id')

            found_task = db.query(TaskModel).filter(
                    TaskModel.id == task_id,
                    TaskModel.owner_id == user_id
                ).first()
            if found_task is None:
                return JSONResponse(content="task not found", status_code=404)
            
            found_task.assignee_id = payload.member_id
            
            db.commit()
            db.refresh(found_task)
            return found_task
        except Exception as e:
            raise HTTPException(status_code=500, detail="Internal server error")

    @staticmethod
    def delete(db: Session, task_id:UUID, user:dict):
        try:
            user_id = user.get('id')

            found_task = db.query(TaskModel).filter(
                    TaskModel.id == task_id,
                    TaskModel.owner_id == user_id
                ).first()
            if found_task is None:
                return JSONResponse(content="task not found", status_code=404)
            
            db.delete(found_task)
            db.commit()
            return JSONResponse(content="task has been deleted successfully", status_code=200)
        except Exception as e:
            raise HTTPException(status_code=500, detail="Internal server error")