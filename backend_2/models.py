from extensions import db
from sqlalchemy.dialects.mysql import JSON

class Admin(db.Model):
    __tablename__  = "admins"

    email          = db.Column(db.String(255), primary_key=True)
    name           = db.Column(db.String(255), nullable=False)
    password_hash  = db.Column(db.String(255), nullable=False)
    store          = db.Column(JSON, default={})
    session_active = db.Column(db.Boolean, default=True)