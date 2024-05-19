from enum import Enum

class TaskStatus(str, Enum):
    pending = "pending"
    doing = "doing"
    completed = "completed"