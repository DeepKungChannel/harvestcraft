
core_infos = {
    'axe_mastery': {"name": "Axe Mastery", "description": "Reduce time to cut down trees by 0.5%"},
    'eco_friendly' : {"name": "Eco-Friendly", "description": "Change to get more woods by 0.75%"},
    'precision_strikes' : {"name": "Precision Strikes", "description": "Increase critical hit chance when cutting a tree by 1%"},
    'pickaxe_mastery' : {"name": "Pickaxe Mastery", "description": "Reduce time to mine stone by 0.75%"}
}

cores = {
    "axe_mastery" : {
        1 : {
            "timeReduct": 0.005 # percent
        }
    },
    "eco_friendly" : {
        1: {
            "dropIncrease": 0.0075
        }
    },
    "presion_strikes" : {
        1: {
            "criticalChance": 0.01
        }
    },
    "pickaxe_mastery" : { # only a target is stone
        1: {
            "timeReduct": 0.0075 
        }
    }
}