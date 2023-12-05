if __name__ == "__main__":
    import sys, os
    sys.path.append(os.path.abspath("../backend"))
from db.tables import Base
from db.engine import engine

def create_all_tables():
    Base.metadata.create_all(engine)


if __name__ == "__main__":
    create_all_tables()