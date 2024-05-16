from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

POSTGRES_URI: str = "postgresql://postgres:123@localhost:5432/todo_list"

# Tạo một đối tượng engine để kết nối với cơ sở dữ liệu
engine = create_engine(POSTGRES_URI)

# Tạo một đối tượng sessionmaker để tạo session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Tạo một đối tượng Base để sử dụng cho các model
Base = declarative_base()

# Tạo một hàm trả về đối tượng session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
