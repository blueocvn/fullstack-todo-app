from typing import Optional
from pydantic import BaseModel

class Task(BaseModel):
  id : int
  name : str
  status : int
  description : str
  team_id : int
  user_id : int
  createAt : str
  updateAt : str

class TaskResponse(BaseModel):
  status : int 
  data : list[Task]

class TaskCreate(BaseModel):
  name : str
  status : str = 0
  description : Optional[str] = None
  team_id : int
  user_id : Optional[int] = None