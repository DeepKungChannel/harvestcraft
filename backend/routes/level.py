from sockets import socketio_manager
from db.engine import session as DBSession
from db.tables import Users
import uuid

@socketio_manager.on("level:get")
async def getLevel(sid, _):
    user_data = await socketio_manager.get_session(sid)
    if user_data is None:
        return {"status": 404, "respones": "User not found"}
    with DBSession() as sa:
        user = sa.query(Users).filter(Users.id == uuid.UUID(user_data.get('id'))).first()
        if user is None:
            return {"status": 404, "respones": "User not found"}
        
        return {"status": 200, "response": {"level": user.level, "xp": user.xp}}