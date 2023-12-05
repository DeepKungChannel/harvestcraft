from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os
load_dotenv()

engine = create_engine(os.getenv("POSTGRES_URL"))
session = sessionmaker(engine)