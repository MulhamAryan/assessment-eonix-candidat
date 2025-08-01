
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from contextlib import contextmanager

FILE_DB_NAME = "ip_addresses.db"
DATABASE_URL = f"sqlite:///./{FILE_DB_NAME}"

db = SQLAlchemy()

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

SessionFactory = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Session = scoped_session(SessionFactory)


@contextmanager
def get_db():
    session = Session()
    try:
        yield session
        session.commit()
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()
        Session.remove()


def init_db(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    with app.app_context():
        db.create_all()
        from models.ip_address import Base
        Base.metadata.create_all(bind=engine)

    return db