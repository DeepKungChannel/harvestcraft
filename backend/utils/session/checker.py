from utils.session.functional import Session

def CheckSignin(session: Session):
    data = session.get_data()

    if data is not None:
        require_field = ['username', 'email', 'id']
        for field in require_field:
            if data.get(field) is None:
                return False
            
    return True