from fastapi import APIRouter
from fastapi.responses import RedirectResponse
from backend.auth.spotify_oauth import get_login_url, handle_callback

router = APIRouter()

@router.get("/login")
def login():
    return RedirectResponse(get_login_url())

@router.get("/callback")
def callback(code: str):
    user_id = handle_callback(code)
    return {"user_id": user_id}
