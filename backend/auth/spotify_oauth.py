from spotipy import Spotify
from spotipy.oauth2 import SpotifyOAuth

from backend.core.config import settings
from backend.core.dependencies import get_token_repository

SCOPE = (
    "playlist-modify-private "
    "playlist-modify-public "
    "user-library-read "
    "user-top-read"
)

sp_oauth = SpotifyOAuth(
    client_id=settings.SPOTIFY_CLIENT_ID,
    client_secret=settings.SPOTIFY_CLIENT_SECRET,
    redirect_uri=settings.SPOTIFY_REDIRECT_URI,
    scope=SCOPE,
    cache_handler=None,          # IMPORTANT: disable Spotipy file cache
    show_dialog=True
)


def get_login_url() -> str:
    """
    Generates Spotify login URL
    """
    return spotify_oauth.get_authorize_url()


def handle_callback(code: str) -> str:
    """
    Handles Spotify OAuth callback and stores token
    """
    token_repo = get_token_repository()

    # Exchange auth code for tokens (Spotipy v2-safe)
    token_info = spotify_oauth.get_access_token(
        code,
        check_cache=False
    )

    access_token = token_info["access_token"]

    sp = Spotify(auth=access_token)
    user_profile = sp.me()

    user_id = user_profile["id"]

    # Persist tokens in DB
    token_repo.save_token(user_id, token_info)

    return user_id
