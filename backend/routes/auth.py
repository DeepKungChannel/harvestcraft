from fastapi import APIRouter, HTTPException, Request
from sqlalchemy import or_
from pydantic import BaseModel
from utils.session.functional import Session as UserSession
from utils.bcrypt import generate_hash_password, check_hash_password
from utils.session.checker import CheckSignin
from db.engine import session as DBSession
from db.tables import Users
import re, uuid, datetime

router = APIRouter()

@router.get("/")
async def auth(request: Request):
    session = UserSession(request)
    signined = CheckSignin(session)
    if signined:
        data = session.get_data()
        username = data.get("username")
        email = data.get("email")
        return { "status": 200, "username": username, "email": email }

    return HTTPException(401, "Unauthorize")

class SignupBody(BaseModel) :
    username: str
    email: str
    password: str

@router.post('/signup')
async def signup(request: Request, body: SignupBody):
    username = body.username
    email = body.email
    password = body.password

    if (len(username) < 3 or len(username) > 10):
        return HTTPException(400, "username length is not in 3-20 character range")

    if re.search(r"[\w|\+|\S]+@[\w]+\.[\w]+", email) is None:
        return HTTPException(400, "Wrong email format")

    if re.search(r"[^\s]{8,}", password) is None:
        return HTTPException(400, "Wrong password format")

    with DBSession() as sa:
        user = sa.query(Users).filter(or_(Users.username == username, Users.email == email)).first()
        if user is not None:
            return HTTPException(409, "User has already existed.")
        newUser = Users(id=uuid.uuid4(), username=username, email=email, password=generate_hash_password(password),
                        create_date=datetime.datetime.utcnow(), level=0, xp=0, inventory={}, equipment={})
        sa.add(newUser)
        sa.commit()
    return {"status": 200}

class SigninBody(BaseModel) :
    username_or_email: str
    password: str

@router.post("/signin")
async def signin(request: Request, body: SigninBody):
    session = UserSession(request)
    signedin = CheckSignin(session)

    username_or_email = body.username_or_email
    password = body.password

    if signedin:
        return HTTPException(409, "You've already signin.")
    
    with DBSession() as sa:
        user = sa.query(Users).filter(or_(Users.email == username_or_email, Users.username == username_or_email)).first()
        if user is None:
            return HTTPException(404, "User not found.")

        match = check_hash_password(password, user.password)
        if match:
            session.set_data({"username": user.username, "email": user.email, "id": str(user.id)})
            return {"status": 200, "username": user.username, "email": user.email }
        
    return HTTPException(401, "Unauthorized")