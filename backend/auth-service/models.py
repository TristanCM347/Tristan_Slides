from extensions import db

class Admin(db.Model):
    __tablename__  = "admins"
    email          = db.Column(db.String(255), primary_key=True)
    name           = db.Column(db.String(255), nullable=False)
    password_hash  = db.Column(db.String(255), nullable=False)
    session_active = db.Column(db.Boolean, default=True)
