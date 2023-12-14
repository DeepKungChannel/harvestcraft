from sockets import socketio_manager
from db.engine import session as DBSession
from db.tables import Users
from module.cores.info import core_infos
import uuid

@socketio_manager.on("core:get")
async def getCore(sid, _):
    user_data = await socketio_manager.get_session(sid)

    with DBSession() as sa:
        user = sa.query(Users).filter(Users.id == uuid.UUID(user_data.get('id'))).first()
        if user is None:
            return {"status": 404, "respones": "User not found"}
    
        userEnabled = user.enable

        coreEnabled = userEnabled.get('core')
        if coreEnabled is None:
            return {"status": 400, "response": "User's core is not enabled"}
        
        cores = []
        for core in coreEnabled:
            cores.append({"id": core, "name": core_infos[core]['name'], "description": core_infos[core]['description'], 'index': list(core_infos.keys()).index(core)})
        
        # sort cores
        cores.sort(key=lambda x: x['index'])
        # Remove 'index' key from the cores list
        for core in cores:
            del core['index']
        return {"status": 200, "response": cores}
