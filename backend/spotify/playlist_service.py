from collections import defaultdict
from backend.utils.playlist_namer import generate_default_name
from backend.schemas.playlist_filters import PlaylistFilters
from backend.spotify.client import get_spotify_client
from backend.spotify.client import get_spotify_recommendations
from backend.spotify.genre_service import enrich_tracks_with_genres
from backend.spotify.audio_ranker import rank_tracks
from backend.core.mcp import mcp_confident
import random

def create_playlist_from_library(
    user_id: str,
    filters: PlaylistFilters,
    playlist_name=None
):
    sp = get_spotify_client(user_id)

    library_tracks = []
    results = sp.current_user_saved_tracks(limit=50)
    while results:
        library_tracks.extend([i["track"] for i in results["items"] if i["track"]])
        results = sp.next(results) if results["next"] else None

    track_ids = [t["id"] for t in library_tracks if t.get("id")]

    seed_tracks = random.sample(
        track_ids,
        min(3, len(track_ids))
    ) if track_ids else []


    recommended_tracks = get_spotify_recommendations(
        user_id=user_id,
        seed_genres=filters.genres,
        seed_tracks=seed_tracks,
        limit=100
    )

    for t in library_tracks:
        t["_source"] = "library"

    for t in recommended_tracks:
        t["_source"] = "recommended"

    tracks = library_tracks + recommended_tracks

    seen = set()
    unique_tracks = []
    for t in tracks:
        if t["id"] not in seen:
            unique_tracks.append(t)
            seen.add(t["id"])

    tracks = unique_tracks


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
        tracks,
        filters
    )
    selected = []
    artist_seen = defaultdict(int)

    max_per_artist = max(2, filters.num_songs // 4)

    for track in ranked:
        first_artist = track.get("artists", [{}])[0].get("id") or "unknown"

        if artist_seen[first_artist] < max_per_artist:
            selected.append(track)
            artist_seen[first_artist] += 1

        if len(selected) == filters.num_songs:
            break

    if len(selected) < filters.num_songs:
        already_selected_ids = {t["id"] for t in selected}

        for track in ranked:
            if track["id"] not in already_selected_ids:
                selected.append(track)

            if len(selected) == filters.num_songs:
                break

    name = playlist_name or generate_default_name(filters)

    playlist = sp.user_playlist_create(
        sp.me()["id"],
        name,
        public=False
    )

    uris = [t["uri"] for t in selected]
    for i in range(0, len(uris), 100):
        sp.playlist_add_items(playlist["id"], uris[i:i+100])

    return playlist["external_urls"]["spotify"]