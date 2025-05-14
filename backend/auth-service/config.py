import os
from dotenv import load_dotenv
load_dotenv()

class Config:
    JWT_SECRET = os.getenv("JWT_SECRET")
    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://{os.getenv('MYSQL_USER')}:"
        f"{os.getenv('MYSQL_PASSWORD')}@"
        f"{os.getenv('MYSQL_HOST')}:{os.getenv('MYSQL_PORT')}/"
        f"{os.getenv('MYSQL_DATABASE')}_auth"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
