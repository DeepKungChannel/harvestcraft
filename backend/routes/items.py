from fastapi import APIRouter

router = APIRouter()

@router.get('/')
async def getItemImg():
    return {"status": 200}