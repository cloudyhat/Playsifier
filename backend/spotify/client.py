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

def get_spotify_recommendations(
    user_id: str,
    seed_genres: list[str] | None = None,
    seed_tracks: list[str] | None = None,
    limit: int = 50,
):
    sp = get_spotify_client(user_id)

    try:
        tracks = []

        if seed_genres:
            for genre in seed_genres[:2]: 
                search_query = f"genre:{genre}"
                search_results = sp.search(
                    q=search_query,
                    type="track",
                    limit=min(limit, 50)
                )
                tracks.extend(search_results["tracks"]["items"])

        if seed_tracks:
            for track_id in seed_tracks[:3]:
                track = sp.track(track_id)
                artist_id = track["artists"][0]["id"]

                artist_top = sp.artist_top_tracks(artist_id)
                tracks.extend(artist_top["tracks"])

        # Deduplicate
        unique_tracks = {t["id"]: t for t in tracks if t.get("id")}

        return list(unique_tracks.values())[:limit]

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Spotify hybrid recommendation error: {str(e)}"
        )
