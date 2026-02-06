from fastapi import FastAPI
from backend.api import auth_routes, playlist_routes

app = FastAPI(title="Playsifier API")

@app.get("/")
def root():
    return {
        "status": "running",
        "message": "Playsifier backend is live 🚀"
    }

app.include_router(auth_routes.router, prefix="/auth", tags=["Auth"])
app.include_router(playlist_routes.router, prefix="/playlist", tags=["Playlist"])
