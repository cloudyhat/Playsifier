from fastapi import APIRouter, Request
from fastapi.responses import RedirectResponse

from backend.auth.spotify_oauth import get_login_url, handle_callback

router = APIRouter()

@router.get("/login")
def login():
    return RedirectResponse(get_login_url())

@router.get("/callback")
def callback(request: Request, code: str):
    user_id = handle_callback(code)

    request.session["user_id"] = user_id

    return {
        "status": "logged_in",
        "user_id": user_id
    }

@router.get("/logout")
def logout(request: Request):
    request.session.clear()
    return {"ok": True}
