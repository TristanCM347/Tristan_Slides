import json
from filelock import FileLock
from threading import Lock
import jwt

from config import Config
from error import InputError, AccessError

# In-memory state
admins = {}
lock = Lock()
file_lock = FileLock(str(Config.DATABASE_FILE) + ".lock")

# Load or initialize database.json
def _load():
    global admins
    if Config.DATABASE_FILE.exists():
        try:
            data = json.loads(Config.DATABASE_FILE.read_text())
            admins = data.get("admins", {})
        except Exception:
            print("WARNING: Corrupt database.json; reinitializing.")
            _save()
    else:
        print("WARNING: No database found, creating a new one.")
        _save()

def _save():
    # serialize admins under a file lock
    with file_lock:
        Config.DATABASE_FILE.write_text(json.dumps({"admins": admins}, indent=2))

_load()

# Helper to wrap a critical section per-user
def user_lock(func):
    def wrapper(*args, **kwargs):
        with lock:
            return func(*args, **kwargs)
    return wrapper

# Auth helpers
def get_email_from_authorization(authorization: str) -> str:
    try:
        token = authorization.replace("Bearer ", "")
        payload = jwt.decode(token, Config.JWT_SECRET, algorithms=["HS256"])
        email = payload["email"]
        if email not in admins:
            raise AccessError("Invalid token")
        return email
    except Exception:
        raise AccessError("Invalid token")

@user_lock
def register(email: str, password: str, name: str) -> str:
    if email in admins:
        raise InputError("Email address already registered")
    admins[email] = {"name": name, "password": password, "store": {}}
    _save()
    return jwt.encode({"email": email}, Config.JWT_SECRET, algorithm="HS256")

@user_lock
def login(email: str, password: str) -> str:
    if email not in admins or admins[email]["password"] != password:
        raise InputError("Invalid username or password")
    return jwt.encode({"email": email}, Config.JWT_SECRET, algorithm="HS256")

@user_lock
def logout(email: str):
    # emulate “sessionActive = false”
    admins[email].setdefault("sessionActive", False)
    admins[email]["sessionActive"] = False
    _save()

# Store helpers
@user_lock
def get_store(email: str) -> dict:
    return admins[email].get("store", {})

@user_lock
def set_store(email: str, store: dict):
    admins[email]["store"] = store
    _save()
