import utils.cache.manager as manager

def get_gathering_state(user_id):
    cache = manager.get("gather:state")
    if cache != {} and cache != None:
        if user_id in cache:
            state =  cache.get(user_id)
            if state is None:
                return False
            return 1 if state == 1 else 0
    return False


def set_gathering_state(user_id, state: bool):
    cache = manager.get("gather:state")
    if cache is None:
        cache = {user_id: state}
    else:
        cache.update({user_id: state})
    manager.set("gather:state", cache)