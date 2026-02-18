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

def parse_prompt(prompt: str) -> PlaylistFilters:
    prompt = prompt.lower().replace("-", " ")

    filters = PlaylistFilters(
        num_songs=req.num_songs,
        max_duration_sec=req.max_duration_sec,
        genres=req.genres,
        mood=req.mood,
        mcp_confidence=0.8
    )

    # number of songs
    match = re.search(r"(\d+)\s+(songs|tracks)", prompt)
    if match:
        filters.num_songs = int(match.group(1))

    # duration
    match = re.search(r"under\s+(\d+)\s*(minute|min|minutes)", prompt)
    if match:
        filters.max_duration_sec = int(match.group(1)) * 60

    # genres
    genres = [g for g in KNOWN_GENRES if g in prompt]
    if genres:
        filters.genres = genres

    for mood in KNOWN_MOODS:
        if mood in prompt:
            filters.mood = mood
            break

    return filters
