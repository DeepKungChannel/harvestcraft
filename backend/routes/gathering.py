from fastapi import APIRouter, Request, HTTPException
from utils.session.functional import Session as UserSession
from utils.session.checker import CheckSignin
from utils.cache import gathering as gathering_cache
from module.level.response import getLevelResponse
from module.level.calculate import get_current_level
from db.engine import session as DBSession
from db.tables import Users
from module.gathering.items import generateItemDrop
from sockets import socketio_manager
import uuid, asyncio

router = APIRouter()


@socketio_manager.on("gather")
async def sio_gathering(sid, data):
    if type(data) != dict:
        return {"status": 400, "response": 'Bad Request'}
    
    if "target" not in data:
        return {"status": 400, "response": 'Bad Request'}


    user_session = await socketio_manager.get_session(sid)
    with DBSession() as sa:
        user = sa.query(Users).filter(Users.id == uuid.UUID(user_session.get('id'))).first()
        if user is None:
            return {"status": 404, "response": 'User not found'}
        
        # Generate itemDrops
        # Get user tool hand info
        target = data.get('target')
        tool = user.equipment.get("hand")
        if tool is None:
            tool = 'barehand'
        
        itemDrops = generateItemDrop(target, tool)
        print(target, tool)
        if itemDrops is None:
            return {"status": 400, "response": "target or tool not found"}
        
        duration = itemDrops['baseTime']
        inProcess = True if gathering_cache.get_gathering_state(str(user.id)) == 1 else False
        
        if "runningTasks" in user_session:
            if "gather" in user_session['runningTasks']:
                inProcess = True
        
        if inProcess:
            return {"status": 409, "response": 'Already running'}
        


        gathering_cache.set_gathering_state(str(user.id), 1)
        if "runningTasks" not in user_session:
            user_session.update({"runningTasks": ["gather"]})
        else:
            tasks = user_session.get("runningTasks")
            if not "gather" in tasks:
                user_session['runningTasks'].append("gather")
        await socketio_manager.save_session(sid, user_session)

        # emit pg message
        # get delay time of tool
        for i in range(1,101):
            await asyncio.sleep(duration/100)
            await socketio_manager.emit("gather", {"pg": i}, room=user_session.get('id'))
        

        # Update item to user inventory
        userInventory = dict(user.inventory)
        for item in itemDrops['items']:
            # Check if item exist
            if item.get('name') in userInventory:
                userInventory[item['name']] += item['count']
            else:
                userInventory.update({item['name']: item['count']})
        
        user.inventory = userInventory
        # Update xp to user xp
        user.xp += itemDrops['xp']
        user.level = get_current_level(user.xp)
        sa.commit()
        await socketio_manager.emit('inventory', {"status": 200, "response": user.inventory}, room=user_session.get('id'))
        await socketio_manager.emit('level:set', {"status": 200, "response": getLevelResponse(user)}, room=user_session.get('id'))

    gathering_cache.set_gathering_state(str(user.id), 0)
    if "runningTasks" in user_session:
        if "gather" in user_session['runningTasks']:
            user_session['runningTasks'].remove("gather")
    await socketio_manager.save_session(sid, user_session)
    
    return {"status": 200, "response": itemDrops}

# class Gatherbody(BaseModel):
#     target: str


# @router.post('/')
# async def gather(request: Request, body: Gatherbody):
#     session = UserSession(request)
#     signedin = CheckSignin(session)

#     if signedin:
#         with DBSession() as sa:
#             user = sa.query(Users).filter(Users.id == session.get_data().get("id")).first()
#             if user is None:
#                 return HTTPException(404, "User not found")
#             target = body.target

#             # Generate itemDrops
#             # Get user tool hand info
#             tool = user.equipment.get("hand")
#             if tool is None:
#                 tool = 'barehand'
#             itemDrops = generateItemDrop(target, tool)
#             if itemDrops is None:
#                 return HTTPException(400)
            

#             # Update item to user inventory
#             userInventory = dict(user.inventory)
#             for item in itemDrops['items']:
#                 # Check if item exist
#                 if item.get('name') in userInventory:
#                     userInventory[item['name']] += item['count']
#                 else:
#                     userInventory.update({item['name']: item['count']})
            
#             user.inventory = userInventory
#             # Update xp to user xp
#             user.xp += itemDrops['xp']
#             sa.commit()
#         return itemDrops
#     else:
#         return HTTPException(401, "Unauthorize")