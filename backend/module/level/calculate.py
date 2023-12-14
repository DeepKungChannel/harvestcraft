def get_required_xp(level):
    levels = sorted(levelXptables.keys())
    
    # If the level exists in the table, return its corresponding XP value
    if level in levelXptables:
        return levelXptables[level]
    
    # Find the highest level lower than the given level
    for l in reversed(levels):
        if l < level:
            return levelXptables[l]
    
    # If no lower level is found, return None or an appropriate default value
    return None

def get_current_level(xp):
    current_level = 0
    current_xp = int(xp)
    while (True):
        required_xp = get_required_xp(current_level)
        if current_xp >= required_xp:
            current_xp -= required_xp
            current_level += 1
        
        else:
            break
    return current_level

    

def get_xp(sumxp):
    current_level = 0
    current_xp = int(sumxp)
    reduce_xp = 0
    while (True):
        required_xp = get_required_xp(current_level)
        if current_xp >= required_xp:
            current_xp -= required_xp
            reduce_xp += required_xp
            current_level += 1
        else: 
            break

    return sumxp - reduce_xp
    

levelXptables = {
    0: 5,
    1: 10,
    2: 15,
    3: 20,
    4: 25,
    5: 30
}