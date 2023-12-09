import os
# check for app to work
devfilepath = "dev.py"
if not os.path.exists(devfilepath):
    with open(devfilepath, 'w') as file:
        file.write("")

from fastapi import FastAPI
from utils.session.middleware import SessionMiddleWare


app = FastAPI()

app.add_middleware(SessionMiddleWare)

from routes import auth
from routes import gathering

app.include_router(auth.router, prefix="/api/harvestcraft/auth")
app.include_router(gathering.router, prefix="/api/harvestcraft/gather")

from sockets import socketioapp, socketio_manager
app.mount('/api/harvestcraft/ws',socketioapp)

