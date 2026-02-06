from backend.spotify.client import get_spotify_client

# Mood → audio feature targets
MOOD_PROFILES = {
    "chill": {"energy": 0.3, "valence": 0.4},
    "happy": {"energy": 0.7, "valence": 0.8},
    "sad": {"energy": 0.2, "valence": 0.2},
    "energetic": {"energy": 0.85, "valence": 0.6},
}

def rank_tracks(
    user_id: str,
    tracks: list[dict],
    mood: str | None = None,
):
    sp = get_spotify_client(user_id)

    ids = [t["id"] for t in tracks if t.get("id")]
    features_map = {}

    for i in range(0, len(ids), 100):
        batch = ids[i:i+100]
        features = sp.audio_features(batch)
        for f in features:
            if f:
                features_map[f["id"]] = f

    def score(track):
        af = features_map.get(track["id"])
        if not af:
            return 0

        base = af["energy"] + af["valence"]

        if mood and mood in MOOD_PROFILES:
            target = MOOD_PROFILES[mood]
            mood_score = (
                1 - abs(af["energy"] - target["energy"])
                + 1 - abs(af["valence"] - target["valence"])
            )
            return base + mood_score

        return base

    return sorted(tracks, key=score, reverse=True)
