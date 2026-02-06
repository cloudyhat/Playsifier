from backend.schemas.playlist_filters import PlaylistFilters
from backend.spotify.client import get_spotify_client
from backend.spotify.genre_service import enrich_tracks_with_genres
from backend.spotify.audio_ranker import rank_tracks
from backend.core.mcp import mcp_confident

def create_playlist_from_library(
    user_id: str,
    filters: PlaylistFilters,
):
    sp = get_spotify_client(user_id)

    tracks = []
    results = sp.current_user_saved_tracks(limit=50)
    while results:
        tracks.extend([i["track"] for i in results["items"] if i["track"]])
        results = sp.next(results) if results["next"] else None

    if filters.max_duration_sec:
        tracks = [
            t for t in tracks
            if t["duration_ms"] <= filters.max_duration_sec * 1000
        ]

    tracks = enrich_tracks_with_genres(user_id, tracks)

    if filters.genres and mcp_confident(filters.mcp_confidence):
        filtered = [
            t for t in tracks
            if any(g in t.get("inferred_genres", []) for g in filters.genres)
        ]
        if len(filtered) >= filters.num_songs:
            tracks = filtered

    ranked = rank_tracks(
        user_id,
        tracks,
        mood="happy" if filters.min_valence else None
    )

    selected = ranked[:filters.num_songs]

    playlist = sp.user_playlist_create(
        sp.me()["id"],
        "Generated Playlist",
        public=False
    )

    uris = [t["uri"] for t in selected]
    for i in range(0, len(uris), 100):
        sp.playlist_add_items(playlist["id"], uris[i:i+100])

    return playlist["external_urls"]["spotify"]
