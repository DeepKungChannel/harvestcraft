try:
    import bcrypt
except ImportError as e:
    print("Bofrost app is required bcrypt. Please use python -m pip install bcrypt")
    raise e


def _unicode_to_bytes(obj):
    
    if isinstance(obj, str):
        obj = bytes(obj, "utf-8")
        return obj
    elif isinstance(obj, bytes):
        return obj
    else:
        raise TypeError("Cannot convert object to type bytes")
        

def check_hash_password(password: str, hash: bytes):
    password = _unicode_to_bytes(password) 
    hash = _unicode_to_bytes(hash)  
    
    return bcrypt.checkpw(password, hash)

def generate_hash_password(password: str):
    password = _unicode_to_bytes(password)
    
    salt = bcrypt.gensalt()

    hash = bcrypt.hashpw(password, salt)
    return hash