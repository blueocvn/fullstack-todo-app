from typing import Optional
from pydantic import BaseModel

class Task(BaseModel):
  id : Optional[int]
  name : str
  status : str
  team_id : int
  user_id : int
  createAt : str
  updateAt : str

class TaskResponse(BaseModel):
  status : int 
  data : list[Task]

class TaskCreate(BaseModel):
  name : str
  status : str 
  description : Optional[str] = None
  team_id : Optional[int] = None
  dueDate : str

class TaskEdit(BaseModel):
  name : str
  description : str
  team_id : int
  status : str
  dueDate : str


