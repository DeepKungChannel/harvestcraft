import socketio
from utils.session.db import get_session_data, set_session_data
socketio_manager = socketio.AsyncServer(async_mode='asgi', core_allowed_origins=[])

socketioapp = socketio.ASGIApp(socketio_server=socketio_manager, socketio_path="/api/harvestcraft/socket.io")

@socketio_manager.event
async def connect(sid, env, a):
    auth = dict(env['asgi.scope']['headers']).get('authentication'.encode())
    if auth is not None:
        havedata, data = get_session_data(auth.decode())
        if havedata:
            await socketio_manager.save_session(sid, data)
            socketio_manager.enter_room(sid, data.get('id'))
            return
    await socketio_manager.disconnect(sid)
