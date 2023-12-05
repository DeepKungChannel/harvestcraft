from sqlalchemy import create_engine, Column, inspect
from sqlalchemy.engine import Engine
from sqlalchemy.dialects.sqlite import  TEXT, JSON
from sqlalchemy.orm import sessionmaker, DeclarativeBase

# connection = sqlite3.connect('users.db')

# cursor = connection.cursor()
engine: Engine   = create_engine('sqlite:///utils/session/users.db')

class Base(DeclarativeBase):
    pass

class Users(Base):
    __tablename__ = "users"
    session_id = Column(TEXT, primary_key=True, nullable=False)
    data = Column(JSON, nullable=False)

Session = sessionmaker(engine)
insp: Engine = inspect(engine)

if not insp.has_table('users', schema=Base.metadata.schema):
    Base.metadata.create_all(engine)
    print("Create a new 'users' table")


def set_session_data(id: str, data: dict):
    with Session() as sa:
        result: Users = sa.query(Users).filter_by(session_id=id).first()
        if result is None:
            user = Users(session_id=id, data=data)
            sa.add(user)
            sa.commit()
        else:
            result.data = data
            sa.commit()
    return True

def get_session_data(id: str):
    with Session() as sa:
        result: Users = sa.query(Users).filter_by(session_id=id).first()
        if result is None:
            return False, None
        return True, result.data
    
def delete_session_data(id: str):
    with Session() as sa:
        user = sa.query(Users).filter_by(session_id=id).first()
        if user is None:
            return False
        sa.delete(user)
        sa.commit()
        return True