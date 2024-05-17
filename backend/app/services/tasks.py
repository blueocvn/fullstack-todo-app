from sqlalchemy.orm import Session
from app.models.tasks import Task

class TaskService:
  def get_tasks(db : Session):
    tasks = db.query(Task).all()
    return { "status"  : 200,"data" : tasks} 