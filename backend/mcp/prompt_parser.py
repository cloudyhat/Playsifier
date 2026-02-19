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

    # --- Extract number of songs (robust) ---
    match = re.search(r"\b(\d+)\b", prompt)
    if match:
        filters.num_songs = int(match.group(1))

    # --- Extract duration constraint ---
    match = re.search(r"under\s+(\d+)\s*(minute|min|minutes)", prompt)
    if match:
        filters.max_duration_sec = int(match.group(1)) * 60

    # --- Extract genres ---
    detected_genres = [g for g in KNOWN_GENRES if g in prompt]
    if detected_genres:
        filters.genres = detected_genres

    # --- Extract mood ---
    for mood in KNOWN_MOODS:
        if mood in prompt:
            filters.mood = mood
            break

    return filters
