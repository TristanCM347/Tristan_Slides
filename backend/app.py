from flask import Flask, jsonify, request, redirect
from flask_cors import CORS

from service import (
    register, login, logout,
    get_email_from_authorization,
    get_store, set_store
)
from error import InputError, AccessError
from config import Config
from extensions import db, migrate

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
migrate.init_app(app, db)
CORS(app)

def catch_errors(fn):
    def wrapper(*args, **kwargs):
        try:
            return fn(*args, **kwargs)
        except InputError as e:
            return jsonify({"error": str(e)}), 400
        except AccessError as e:
            return jsonify({"error": str(e)}), 403
        except Exception as e:
            app.logger.exception(e)
            return jsonify({"error": "A system error occurred"}), 500
    wrapper.__name__ = fn.__name__
    return wrapper

def authed(fn):
    def wrapper(*args, **kwargs):
        auth = request.headers.get("Authorization", "")
        email = get_email_from_authorization(auth)
        return fn(email, *args, **kwargs)
    wrapper.__name__ = fn.__name__
    return wrapper

# ───── Auth endpoints ─────────────────────────────────────────

@app.route("/admin/auth/register", methods=["POST"])
@catch_errors
def route_register():
    body = request.get_json()
    token = register(body["email"], body["password"], body["name"])
    return jsonify({"token": token})

@app.route("/admin/auth/login", methods=["POST"])
@catch_errors
def route_login():
    body = request.get_json()
    token = login(body["email"], body["password"])
    return jsonify({"token": token})

@app.route("/admin/auth/logout", methods=["POST"])
@catch_errors
@authed
def route_logout(email):
    logout(email)
    return jsonify({})

# ───── Store endpoints ────────────────────────────────────────

@app.route("/store", methods=["GET"])
@catch_errors
@authed
def route_get_store(email):
    store = get_store(email)
    return jsonify({"store": store})

@app.route("/store", methods=["PUT"])
@catch_errors
@authed
def route_set_store(email):
    body = request.get_json()
    set_store(email, body["store"])
    return jsonify({})

# ───── Root & Runner ──────────────────────────────────────────

@app.route("/", methods=["GET"])
def root():
    return redirect("/docs")

@app.route("/health")
def health():
    return {"status": "ok"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=Config.PORT)
