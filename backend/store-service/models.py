from sqlalchemy.dialects.mysql import JSON
from extensions import db

class Store(db.Model):
    __tablename__ = "stores"
    email = db.Column(db.String(255), primary_key=True)
    data  = db.Column(JSON, default={})
