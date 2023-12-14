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
    equipment = Column(JSON(), nullable=True)
    xp = Column(INTEGER(), nullable=False, default=0)
    core = Column(JSON(), nullable=True)
    enable = Column(JSON(), nullable=True)

class Items(Base):
    __tablename__ = "items"
    id = Column(UUID(as_uuid=True), primary_key=True, nullable=False)
    description = Column(VARCHAR(200), nullable=True)
    name = Column(VARCHAR(200), nullable=False)
    picture = Column(BYTEA(), nullable=True)
    type = Column(VARCHAR(), nullable=False)
    abilities = Column(JSON(), nullable=True)

class Cores(Base):
    __tablename__ = "cores"
    id = Column(UUID(as_uuid=True), primary_key=True, nullable=False)
    name = Column(VARCHAR(200), nullable=False)
    description = Column(VARCHAR(200), nullable=True)
    data = Column(JSON(), nullable=True)