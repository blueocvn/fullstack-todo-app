from pydantic import BaseModel

class Task(BaseModel):
  id : int
  name : str
  status : str
  description : str
  team_id : int
  user_id : int
  createAt : str
  updateAt : str

class TaskResponse(BaseModel):
  status : int 
  data : list[Task]