from spotipy import Spotify
from backend.auth.spotify_oauth import sp_oauth
from fastapi import HTTPException

USER_TOKENS = {}

def get_spotify_client(user_id: str) -> Spotify:
    token_info = USER_TOKENS.get(user_id)

    if not token_info:
        raise HTTPException(
            status_code=401,
            detail="User not authenticated with Spotify. Please login first."
        )

    if sp_oauth.is_token_expired(token_info):
        token_info = sp_oauth.refresh_access_token(
            token_info["refresh_token"]
        )
        USER_TOKENS[user_id] = token_info

    return Spotify(auth=token_info["access_token"])
