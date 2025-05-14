from flask import Flask, request, jsonify
from flask_cors import CORS
from config import Config
from extensions import db, migrate
from error import InputError, AccessError
from service import register, login, logout

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)
    db.init_app(app)
    migrate.init_app(app, db)

    def catch_errors(fn):
        def wrapper(*args, **kw):
            try:
                return fn(*args, **kw)
            except InputError as e:
                return jsonify({"error": str(e)}), 400
            except AccessError as e:
                return jsonify({"error": str(e)}), 403
        wrapper.__name__ = fn.__name__; return wrapper

    @app.route("/admin/auth/register", methods=["POST"])
    @catch_errors
    def route_register():
        b = request.get_json()
        token = register(b["email"], b["password"], b["name"])
        return jsonify({"token": token})

    @app.route("/admin/auth/login", methods=["POST"])
    @catch_errors
    def route_login():
        b = request.get_json()
        token = login(b["email"], b["password"])
        return jsonify({"token": token})

    @app.route("/admin/auth/logout", methods=["POST"])
    @catch_errors
    def route_logout():
        auth = request.headers.get("Authorization", "")
        # decode + verify existence
        from service import login, logout
        from service import jwt, Config, AccessError
        try:
            token = auth.replace("Bearer ", "")
            payload = jwt.decode(token, Config.JWT_SECRET, algorithms=["HS256"])
            email = payload["email"]
        except Exception:
            raise AccessError("Invalid token")
        logout(email)
        return jsonify({})

    return app

if __name__ == "__main__":
    create_app().run(port=5001)
