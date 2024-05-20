from fastapi import APIRouter,Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.schemas.tasks import TaskResponse
from app.services.tasks import TaskService
from app.core.database import get_db
from app.schemas.auth import TokenData
from app.services.auth import get_user, get_account_by_email
import jwt

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

task_router = APIRouter(prefix="/api/tasks",tags=["Tasks"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@task_router.get("/",response_model=TaskResponse)
def get_tasks(db : Session = Depends(get_db)):
  return TaskService.get_tasks(db=db)

# Creating new task
@task_router.post("/",response_model=TaskResponse)
def create_tasks(token: str = Depends(oauth2_scheme), db : Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except jwt.PyJWTError:
        raise credentials_exception
    account = get_account_by_email(db, email=token_data.email)
    if account is None:
        raise credentials_exception
    user = get_user(db, account.user_id)


    return 