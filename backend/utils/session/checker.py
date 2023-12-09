from utils.session.functional import Session
from dev import devids

def CheckSignin(session: Session):
    data = session.get_data()
    if data is not None:
        require_field = ['username', 'email', 'id']
        for field in require_field:
            if data.get(field) is None:
                return False
        
        return True
    
    return False

def IsDev(session: Session):
    signedin = CheckSignin(session)

    if signedin:
        data = session.get_data()
        id = data.get("id")
        if id in devids:
            return True
    
    return False