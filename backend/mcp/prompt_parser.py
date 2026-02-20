import re
from backend.schemas.playlist_filters import PlaylistFilters

KNOWN_GENRES = [
    "pop", "rock", "indie", "acoustic",
    "hip hop", "lofi", "jazz", "classical", "edm"
]

KNOWN_MOODS = [
    "chill",
    "calm",
    "energetic",
    "happy",
    "sad",
    "focus"
]


def parse_prompt(prompt: str, base_filters: PlaylistFilters) -> PlaylistFilters:
    prompt = prompt.lower().replace("-", " ")

    filters = PlaylistFilters(
        num_songs=base_filters.num_songs,
        max_duration_sec=base_filters.max_duration_sec,
        genres=list(base_filters.genres) if base_filters.genres else [],
        mood=base_filters.mood,
        mcp_confidence=base_filters.mcp_confidence
    )

    match = re.search(r"(about|around|approx)?\s*(\d+)\s*(songs|tracks)?", prompt)
    if match:
        filters.num_songs = int(match.group(2))

    match = re.search(r"(under|less than)\s+(\d+)\s*(minute|min|minutes)", prompt)
    if match:
        filters.max_duration_sec = int(match.group(2)) * 60

    match = re.search(r"(\d+)\s*(hour|hours)", prompt)
    if match:
        total_seconds = int(match.group(1)) * 3600

        avg_song_sec = 210
        filters.num_songs = max(1, total_seconds // avg_song_sec)

    excluded = []
    for genre in KNOWN_GENRES:
        if f"no {genre}" in prompt:
            excluded.append(genre)

    if "only" in prompt:
        detected = [g for g in KNOWN_GENRES if g in prompt]
        if detected:
            filters.genres = detected
    else:
        detected = [g for g in KNOWN_GENRES if g in prompt]
        if detected:
            filters.genres = detected

    if excluded:
        filters.genres = [g for g in filters.genres if g not in excluded]

    for mood in KNOWN_MOODS:
        if mood in prompt:
            filters.mood = mood
            break

    if "make me happy" in prompt or "cheer me up" in prompt:
        filters.mood = "happy"

    if "help me focus" in prompt:
        filters.mood = "focus"

    return filters