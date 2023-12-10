def checkDict(data, *check_fields):
    if type(data) != dict:
        return False
    
    if check_fields != []:
        for field in check_fields:
            if not field in data:
                return False

    return True  
    
