from collections import Counter
from backend.spotify.client import get_spotify_client

def enrich_tracks_with_genres(user_id: str, tracks: list[dict]) -> list[dict]:
    """
    Adds inferred genres to each track using artist genres.
    """
    sp = get_spotify_client(user_id)

    artist_ids = set()
    for track in tracks:
        for artist in track["artists"]:
            artist_ids.add(artist["id"])

    artist_genre_map = {}
    artist_ids = list(artist_ids)

    # Spotify allows 50 artists per call
    for i in range(0, len(artist_ids), 50):
        batch = artist_ids[i:i+50]
        artists = sp.artists(batch)["artists"]
        for artist in artists:
            artist_genre_map[artist["id"]] = artist.get("genres", [])

    enriched = []
    for track in tracks:
        genres = []
        for artist in track["artists"]:
            genres.extend(artist_genre_map.get(artist["id"], []))

        track_copy = track.copy()
        track_copy["inferred_genres"] = list(set(genres))
        enriched.append(track_copy)

    return enriched
