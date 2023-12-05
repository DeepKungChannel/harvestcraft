from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.schema import Column, MetaData
from sqlalchemy.dialects.postgresql import base as Base
from sqlalchemy.dialects.postgresql import VARCHAR, INTEGER, UUID, TIMESTAMP, JSON, BYTEA

class Base(DeclarativeBase):
    pass

class Users(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, nullable=False)
    username = Column(VARCHAR(100), nullable=False)
    email = Column(VARCHAR(200), nullable=False)
    password = Column(BYTEA(), nullable=False)
    create_date = Column(TIMESTAMP(timezone=False, precision=5), nullable=False)
    inventory = Column(JSON(), nullable=True)
    level = Column(INTEGER(), nullable=False, default=0)
    xp = Column(INTEGER(), nullable=False, default=0)

class Items(Base):
    __tablename__ = "items"
    id = Column(UUID(as_uuid=True), primary_key=True, nullable=False)
    name = Column(VARCHAR(200), nullable=False)
    picture = Column(BYTEA(), nullable=True)
