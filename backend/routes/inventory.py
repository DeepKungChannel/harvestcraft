from sockets import socketio_manager
from db.engine import session as DBSession
from db.tables import Users
import uuid

@socketio_manager.on("inventory")
async def getInventoryData(sid, data):
    user_session = await socketio_manager.get_session(sid)

    with DBSession() as sa:
        user = sa.query(Users).filter_by(id=uuid.UUID(user_session.get('id'))).first()
        if user is None:
            return {"status": 404, "response": "User not found"}

    return {"status": 200, "response": user.inventory}