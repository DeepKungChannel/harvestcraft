from starlette.middleware.base import BaseHTTPMiddleware

class SessionMiddleWare(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        old_id = request.cookies.get('session')
        if old_id is not None:
            request.scope.update({'session_id': old_id})
        response = await call_next(request)
        session_id = request.scope.get('session_id')
        if session_id is not None and session_id != old_id:
            response.set_cookie('session', session_id, httponly=True, max_age=604800)

        else:
            if session_id is None and session_id != old_id:
                response.delete_cookie('session', httponly=True)
        return response

