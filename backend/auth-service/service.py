import jwt
from werkzeug.security import generate_password_hash, check_password_hash
from config import Config
from error import InputError, AccessError
from extensions import db
from models import Admin

def register(email, password, name):
    if Admin.query.get(email):
        raise InputError("Email already registered")
    a = Admin(
        email=email,
        name=name,
        password_hash=generate_password_hash(password),
        session_active=True
    )
    db.session.add(a); db.session.commit()
    return jwt.encode({"email": email}, Config.JWT_SECRET, algorithm="HS256")

def login(email, password):
    admin = Admin.query.get(email)
    if not admin or not check_password_hash(admin.password_hash, password):
        raise InputError("Invalid credentials")
    return jwt.encode({"email": email}, Config.JWT_SECRET, algorithm="HS256")

def logout(email):
    admin = Admin.query.get(email)
    if not admin:
        raise AccessError("Invalid user")
    admin.session_active = False
    db.session.commit()
