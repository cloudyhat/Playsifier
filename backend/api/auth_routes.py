from fastapi import APIRouter, Request
from fastapi.responses import RedirectResponse
from fastapi import HTTPException
from backend.auth.spotify_oauth import get_login_url, handle_callback

router = APIRouter()

@router.get("/login")
def login():
    return RedirectResponse(get_login_url())

@router.get("/callback")
def callback(request: Request, code: str):
    user_id = handle_callback(code)

    request.session["user_id"] = user_id

    return RedirectResponse(
        url="http://127.0.0.1:5173/dashboard",
        status_code=302
    )

@router.get("/me")
def me(request: Request):
    user_id = request.session.get("user_id")

    if not user_id:
        raise HTTPException(status_code=401, detail="Not authenticated")

    return {
        "authenticated": True,
        "user_id": user_id
    }

@router.get("/logout")
def logout(request: Request):
    request.session.clear()
    return {"ok": True}
