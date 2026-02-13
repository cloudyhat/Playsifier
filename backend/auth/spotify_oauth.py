from spotipy import Spotify
from spotipy.oauth2 import SpotifyOAuth

from backend.core.config import settings
from backend.core.dependencies import get_token_repository

SCOPE = " ".join([
        "user-library-read",
        "playlist-modify-public",
        "playlist-modify-private",
        "user-read-private",
        "user-read-email"
    ])

sp_oauth = SpotifyOAuth(
    client_id=settings.SPOTIFY_CLIENT_ID,
    client_secret=settings.SPOTIFY_CLIENT_SECRET,
    redirect_uri=settings.SPOTIFY_REDIRECT_URI,
    scope=SCOPE,
    cache_path=None,        
    show_dialog=True
)


def get_login_url() -> str:
    return sp_oauth.get_authorize_url()


def handle_callback(code: str) -> str:
    token_repo = get_token_repository()

    token_info = sp_oauth.get_access_token(code, as_dict=True) 

    sp = Spotify(auth=token_info["access_token"])
    user_profile = sp.me()

    user_id = user_profile["id"]
    token_repo.save_token(user_id, token_info)

    return user_id
