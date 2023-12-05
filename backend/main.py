from fastapi import FastAPI
from utils.session.middleware import SessionMiddleWare

app = FastAPI()

app.add_middleware(SessionMiddleWare)

from routes import auth
app.include_router(auth.router, prefix="/api/harvestcraft/auth")