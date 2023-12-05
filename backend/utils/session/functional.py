from fastapi import  Request
from utils.session import db as SessionDBapi
import uuid

class Session:

    def __init__(self, request: Request):
        self.request = request
        self.id = request.cookies.get("session")
        self.data = None
        if self.id is not None:
            found, data = SessionDBapi.get_session_data(self.id)
            if found:
                self.data = data

    def set_data(self, data: dict):
        if type(data) != dict:
            raise TypeError("Data has to be python dictionary")
        if self.id is None:
            new_id = str(uuid.uuid4())
            SessionDBapi.set_session_data(new_id, data)
            self.id = new_id
            self.request.scope.update({'session_id': new_id})
            self.data = data
        else:
            SessionDBapi.set_session_data(self.id, data)
            self.data = data

    def delete(self):
        SessionDBapi.delete_session_data(self.id)
        self.data = None
        self.id = None
        self.request.scope.pop('session_id')

    def get_data(self):
        return self.data