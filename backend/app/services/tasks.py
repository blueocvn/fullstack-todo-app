from sqlalchemy.orm import Session
from app.models.tasks import Task
from app.schemas.tasks import TaskCreate
import app.services.auth as AuthService
from datetime import datetime
class TaskService:
  def get_tasks(db : Session):
    tasks = db.query(Task).all()
    return { "status"  : 200,"data" : tasks} 
  
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