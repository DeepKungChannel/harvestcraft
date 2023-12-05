from fastapi import APIRouter, Request, HTTPException
from utils.session.functional import Session as UserSession
from utils.session.checker import CheckSignin

router = APIRouter()

@router.post('/')
async def gather(request: Request):
    session = UserSession(request)

    # items, status = generateItemDrop()

    # return { "status": status, "items": items }
    pass