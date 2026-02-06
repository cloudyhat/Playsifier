import re
from backend.schemas.playlist_filters import PlaylistFilters

KNOWN_GENRES = [
    "pop", "rock", "indie", "acoustic",
    "hip hop", "lofi", "jazz", "classical", "edm"
]

MOOD_RULES = {
    "chill": {"max_energy": 0.6},
    "calm": {"max_energy": 0.5},
    "energetic": {"min_energy": 0.7},
    "happy": {"min_valence": 0.6},
    "sad": {"max_valence": 0.4},
    "focus": {"max_energy": 0.5},
}

def parse_prompt(prompt: str) -> PlaylistFilters:
    prompt = prompt.lower().replace("-", " ")

    filters = PlaylistFilters(
        num_songs=20,
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

    # mood → audio features (first match wins)
    for mood, rules in MOOD_RULES.items():
        if mood in prompt:
            for k, v in rules.items():
                setattr(filters, k, v)
            break

    return filters
