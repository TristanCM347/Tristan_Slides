import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env into os.environ
load_dotenv()

class Config:
    JWT_SECRET     = os.getenv("JWT_SECRET")
    PORT           = int(os.getenv("BACKEND_PORT", 5000))

    DB_USER        = os.getenv("MYSQL_USER")
    DB_PASSWORD    = os.getenv("MYSQL_PASSWORD")
    DB_HOST        = os.getenv("MYSQL_HOST")
    DB_PORT        = os.getenv("MYSQL_PORT")
    DB_NAME        = os.getenv("MYSQL_DATABASE")

    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False