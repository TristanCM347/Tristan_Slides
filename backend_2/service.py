import jwt
from werkzeug.security import generate_password_hash, check_password_hash

from config import Config
from error import InputError, AccessError
from extensions import db
from models import Admin

def get_email_from_authorization(authorization: str) -> str:
    """
    Decode the JWT, verify the user exists, and return their email.
    Raises AccessError on any failure.
    """
    try:
        token = authorization.replace("Bearer ", "")
        payload = jwt.decode(token, Config.JWT_SECRET, algorithms=["HS256"])
        email = payload.get("email")
        if email is None:
            raise AccessError("Invalid token")
    except jwt.PyJWTError:
        raise AccessError("Invalid token")

    admin = Admin.query.get(email)
    if not admin:
        raise AccessError("Invalid token")
    return email

def register(email: str, password: str, name: str) -> str:
    """
    Create a new admin user with a hashed password.
    Raises InputError if the email already exists.
    Returns a JWT on success.
    """
    if Admin.query.get(email):
        raise InputError("Email address already registered")

    admin = Admin(
        email=email,
        name=name,
        password_hash=generate_password_hash(password),
        store={},               # default empty store
        session_active=True
    )
    db.session.add(admin)
    db.session.commit()

    return jwt.encode(
        {"email": email},
        Config.JWT_SECRET,
        algorithm="HS256"
    )

def login(email: str, password: str) -> str:
    """
    Verify credentials and return a JWT.
    Raises InputError on any failure.
    """
    admin = Admin.query.get(email)
    if not admin or not check_password_hash(admin.password_hash, password):
        raise InputError("Invalid username or password")

    return jwt.encode(
        {"email": email},
        Config.JWT_SECRET,
        algorithm="HS256"
    )

def logout(email: str):
    """
    Mark the admin as logged out.
    """
    admin = Admin.query.get(email)
    if not admin:
        raise AccessError("Invalid user")
    admin.session_active = False
    db.session.commit()

def get_store(email: str) -> dict:
    """
    Return the current 'store' JSON blob for this admin.
    """
    admin = Admin.query.get(email)
    if not admin:
        raise AccessError("Invalid user")
    return admin.store or {}

def set_store(email: str, store: dict):
    """
    Replace the admin's 'store' JSON blob.
    """
    admin = Admin.query.get(email)
    if not admin:
        raise AccessError("Invalid user")
    admin.store = store
    db.session.commit()
