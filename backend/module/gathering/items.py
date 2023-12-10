import random
from utils.session.functional import Session as UserSession
from utils.session.checker import CheckSignin
from db.engine import session as DBSession
from db.tables import Users

def generateItemDrop(target, tools):
    if not target in loottable:
        return None

    if not tools in loottable[target]:
        return None
    
    items = []
    ItemDrop = {"baseTime": loottable[target][tools]['baseTime']}
    data = loottable[target][tools]
    xp = 0
    for itemName, drop_info in data['drop'].items():
        count = random.randint(drop_info['min'], drop_info['max'])
        got = 1 if random.random() < drop_info['chance'] else 0

        if (got):
            items.append({"name": itemName, "count": count})
            xp += drop_info['xp']
    ItemDrop.update({"items": items})
    ItemDrop.update({"xp": xp})
    return ItemDrop


loottable = {
    "wood": {
        "barehand": {"drop": {
            "wood_log": {"min": 1, "max" : 2, "chance": 1, "xp": 3}
        }, "baseTime": 12},
        "axe1": {"drop": {
            "wood_log": {"min": 3, "max" : 3, "chance": 0.7, "xp": 3},
            "branche": {"min": 1, "max": 2, "chance": 0.3, "xp": 1}
        }, "baseTime": 10},
        "axe2": {"drop": {
            "wood_log": {"min": 6, "max" : 6, "chance": 0.7, "xp": 12},
            "branche": {"min": 2, "max": 3, "chance": 0.3, "xp": 10},
        }, "baseTime": 8},
        "ax3": {"drop": {
            "wood_log": {"min": 9, "max" : 9, "chance": 0.7, "xp": 12},
            "branche": {"min": 4, "max": 6, "chance": 0.3, "xp": 10},
        }, "baseTime": 7},
        "axe4": {"drop": {
            "wood_log": {"min": 12, "max" : 12, "chance": 0.7, "xp": 12},
            "branche": {"min": 5, "max": 7, "chance": 0.3, "xp": 10},
        }, "baseTime": 6},
        "axe5": {"drop": {
            "wood_log": {"min": 15, "max" : 15, "chance": 0.7, "xp": 12},
            "branche": {"min": 6, "max": 7, "chance": 0.3, "xp": 10},
        }, "baseTime": 5}
    },
    "stone": {
        "barehand": {"drop": {
            "stone": {"min": 1, "max": 2, "chance": 1, "xp": 10}
        }, "baseTime": 20},
        "pickaxe1": {"drop": {
            "stone": {"min": 3, "max": 3, "chance": 0.5, "xp": 10},
            "iron": {"min": 2, "max": 2, "chance": 0.33, "xp": 10},
        }, "baseTime": 15},
        "pickaxe2": {"drop": {
            "stone": {"min": 6, "max": 6, "chance": 0.5, "xp": 13},
            "iron": {"min": 4, "max": 4, "chance": 0.33, "xp": 13},
        }, "baseTime": 12},
        "pickaxe3": {"drop": {
            "stone": {"min": 9, "max": 9, "chance": 0.5, "xp": 16},
            "iron": {"min": 6, "max": 6, "chance": 0.33, "xp": 16},
        }, "baseTime": 10},
    }
}