from spotipy import Spotify
from backend.auth.spotify_oauth import sp_oauth
from backend.core.dependencies import get_token_repository
from fastapi import HTTPException


def get_spotify_client(user_id: str) -> Spotify:
    token_repo = get_token_repository()
    token_info = token_repo.get_token(user_id)

    if not token_info:
        raise HTTPException(
            status_code=401,    
            detail="User not authenticated with Spotify. Please login first."
        )


    if sp_oauth.is_token_expired(token_info):
        token_info = sp_oauth.refresh_access_token(
            token_info["refresh_token"]
        )
        token_repo.save_token(user_id, token_info)

    return Spotify(auth=token_info["access_token"])
