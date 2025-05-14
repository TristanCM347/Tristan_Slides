import jwt
from config import Config
from error import AccessError
from extensions import db
from models import Store

def _get_email_from_token(authorization: str) -> str:
    try:
        token = authorization.replace("Bearer ", "")
        payload = jwt.decode(token, Config.JWT_SECRET, algorithms=["HS256"])
        email = payload["email"]
    except Exception:
        raise AccessError("Invalid token")
    return email

def get_store(email: str):
    s = Store.query.get(email)
    if not s:
        return {}
    return s.data

def set_store(email: str, new_store: dict):
    s = Store.query.get(email)
    if not s:
        s = Store(email=email, data=new_store)
        db.session.add(s)
    else:
        s.data = new_store
    db.session.commit()
