from db.tables import Users
from db.engine import session as DBSession
from module.level.calculate import get_xp, get_required_xp

def getLevelResponse(user: Users):

    return {"level": user.level, "xp": get_xp(user.xp), "required": get_required_xp(user.level)}