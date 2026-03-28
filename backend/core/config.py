from pathlib import Path
from dotenv import load_dotenv
import os

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

class Settings:
    # Spotify Configuration
    SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
    SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
    SPOTIFY_REDIRECT_URI = os.getenv("SPOTIFY_REDIRECT_URI")

    # Application Configuration
    SECRET_KEY = os.getenv("SECRET_KEY", "change-me-in-production")
    
    # Database Configuration
    DATABASE_URL = os.getenv(
        "DATABASE_URL",
        "sqlite:///./playsifier.db"
    )
    USE_DB = os.getenv("USE_DB", "false").lower() == "true"
    
    # Redis Configuration
    REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")

settings = Settings()
