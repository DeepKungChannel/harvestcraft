import redis, pickle

r = redis.Redis(host='localhost', port=6379)

def set(key, value, seconds=60):
    if type(value) == dict:
        # convert dict to bytes
        value = pickle.dumps(value)
    r.set(key, value, ex=seconds)

def get(key):
    data = r.get(key)
    if data is None:
        return None
    try:
        data = data.decode()
    except UnicodeDecodeError:
        data = pickle.loads(data)
    return data
