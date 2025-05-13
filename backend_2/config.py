import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env into os.environ
load_dotenv()

class Config:
    JWT_SECRET     = os.getenv("JWT_SECRET", "llamallamaduck")
    PORT           = int(os.getenv("BACKEND_PORT", 5000))

# ── new for MySQL ─────────────────────────────
SQLALCHEMY_DATABASE_URI        = os.getenv("DATABASE_URL")
SQLALCHEMY_TRACK_MODIFICATIONS = False