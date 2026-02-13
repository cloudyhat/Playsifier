from fastapi import FastAPI
from starlette.middleware.sessions import SessionMiddleware

from backend.api import auth_routes, playlist_routes
from backend.core.config import settings

app = FastAPI(title="Playsifier API")

app.add_middleware(
    SessionMiddleware,
    secret_key=settings.SECRET_KEY
)

@app.get("/")
def root():
    return {
        "status": "running",
        "message": "Playsifier backend is live 🚀"
    }

app.include_router(auth_routes.router, prefix="/auth", tags=["Auth"])
app.include_router(playlist_routes.router, prefix="/playlist", tags=["Playlist"])
