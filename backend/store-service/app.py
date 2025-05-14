from flask import Flask, request, jsonify
from flask_cors import CORS
from config import Config
from extensions import db
from error import AccessError
from service import _get_email_from_token, get_store, set_store

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)
    db.init_app(app)

    def catch_errors(fn):
        def wrapper(*args, **kw):
            try:
                return fn(*args, **kw)
            except AccessError as e:
                return jsonify({"error": str(e)}), 403
        wrapper.__name__ = fn.__name__; return wrapper

    @app.route("/store", methods=["GET"])
    @catch_errors
    def route_get_store():
        auth = request.headers.get("Authorization", "")
        email = _get_email_from_token(auth)
        return jsonify({"store": get_store(email)})

    @app.route("/store", methods=["PUT"])
    @catch_errors
    def route_set_store():
        auth = request.headers.get("Authorization", "")
        email = _get_email_from_token(auth)
        body = request.get_json()
        set_store(email, body["store"])
        return jsonify({})

    return app

if __name__ == "__main__":
    create_app().run(port=5002)
