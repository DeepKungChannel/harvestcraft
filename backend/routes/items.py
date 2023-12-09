from fastapi import APIRouter, Request, HTTPException
from pydantic import BaseModel
from utils.session.functional import Session as UserSession
from utils.session.checker import IsDev, CheckSignin
from db.engine import session as DBSession
from db.tables import Users
from sockets import socketio_manager
router = APIRouter()

@router.get('/')
async def getItemImg():
    return {"status": 200}
    

class create_new_item(BaseModel):
    name: str
    name = str
    description = str
    picture = bytes
    type = str
    abilities = dict

@router.put('/')
async def create_new_item(request: Request):
    session = UserSession(request)
    dev = IsDev(session)

    if dev:
        pass

    return HTTPException(401)

class GatherBody(BaseModel):
    target: str

@router.post('/gather')
async def gather(session: UserSession, body: GatherBody):
    signedin = CheckSignin(session)
    if signedin:
        target = body.target
        with DBSession() as sa:
            user = sa.query(Users).filtery_by(session.get_data().get("id")).first()
            if user is None:
                return HTTPException(404, "User not found")
    
    return HTTPException(401, 'Unauthorize')