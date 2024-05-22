from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.tasks import Task
from app.schemas.tasks import TaskCreate,TaskEdit
import app.services.auth as AuthService
from datetime import datetime
class TaskService:
  def get_tasks(db : Session, token : str):
    token = AuthService.decode_jwt(token)
    user_id = token.id
    tasks = db.query(Task).filter(Task.user_id == user_id).all()
    return { "status"  : 200,"data" : tasks} 
  
  def get_task(db : Session,task_id : int):
    task = db.query(Task).filter(Task.id == task_id).first()
    return {"status" : 200,"data" : task}
    
  def create_task(db : Session,task : TaskCreate,token : str):
    token = AuthService.decode_jwt(token)
    user_id = token.id
    db_task = Task(
        name = task.name,
        user_id = user_id,
        team_id = task.team_id,
        description = task.description,
        dueDate = task.dueDate ,
        status = task.status,
        createAt = datetime.now(),
        updateAt = datetime.now()
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return { "status" : 200,"message" : "Create task success"}

  def edit_task(db : Session,task : TaskEdit,task_id : int):
    db_task = db.query(Task).filter(Task.id == task_id)
    current_task = db_task.first()

    if not current_task :
      raise HTTPException(status_code=404,detail="Task not found")
   
    current_task.name = task.name,
    current_task.description = task.description,
    current_task.dueDate = task.dueDate,
    current_task.status = task.status,
    updateAt = datetime.now()

    db.add(current_task)
    db.commit()
    return {"status" : 200,"message" : "Update task success"}

  def delete_task(task_id : int,db: Session):
    db_task = db.query(Task).filter(Task.id == task_id).first()

    if not db_task:
      raise HTTPException(status_code=404,detail="Task not found")
 
    db.delete(db_task)
    db.commit()
    return {"status" : 200,"message": "Delete task success"}