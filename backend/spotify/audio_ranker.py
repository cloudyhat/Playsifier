from datetime import datetime
from collections import defaultdict
from backend.spotify.mood_profiles import MOOD_PROFILES
import random

def rank_tracks(
    tracks: list[dict],
    filters=None,
):
    current_year = datetime.now().year
    artist_count = defaultdict(int)

    # First pass to count artist frequency
    for t in tracks:
        for a in t.get("artists", []):
            artist_count[a["id"]] += 1

    def score(track):
        # --- Popularity ---
        pop_score = track.get("popularity", 0) / 100

        # --- Recency ---
        release_date = track.get("album", {}).get("release_date", "")
        release_year = int(release_date[:4]) if release_date else current_year
        years_old = current_year - release_year
        recency_score = max(0, 1 - (years_old / 10))

        # --- Genre Match ---
        if filters and filters.genres:
            inferred = set(track.get("inferred_genres", []))
            target = set(filters.genres)
            if not target:
                genre_score = 0.5
            else:
                genre_score = len(inferred & target) / len(target)
        else:
            genre_score = 0.5

        # --- Duration Fit ---
        if filters and filters.max_duration_sec:
            max_dur = filters.max_duration_sec * 1000
            duration_ratio = track.get("duration_ms", 0) / max_dur
            duration_score = max(0, 1 - duration_ratio)
        else:
            duration_score = 0.5

        # --- Diversity ---
        first_artist = track.get("artists", [{}])[0].get("id")
        freq = artist_count.get(first_artist, 1)
        diversity_score = 1 / freq

        profile = None
        if filters and filters.mood:
            profile = MOOD_PROFILES.get(filters.mood)

        if profile:
            # genre boost
            inferred = track.get("inferred_genres", [])
            boosted = profile["genre_boost"]
            genre_boost_score = 1 if any(b in g for g in inferred for b in boosted) else 0.5

            final_score = (
                profile["popularity_weight"] * pop_score +
                profile["recency_weight"] * recency_score +
                0.2 * genre_boost_score +
                0.1 * diversity_score
            )
        else:
            final_score = (
                0.35 * pop_score +
                0.20 * recency_score +
                0.25 * genre_score +
                0.10 * duration_score +
                0.10 * diversity_score
            )


        return final_score

    ranked = sorted(tracks, key=score, reverse=True)
    return ranked
