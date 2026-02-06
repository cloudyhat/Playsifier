from backend.core.mcp import mcp_confident
from backend.tests.fixtures.tracks import FAKE_TRACKS

def test_mcp_confident():
    assert mcp_confident(0.7) is True
    assert mcp_confident(0.5) is False

def test_genre_filter_applied():
    genres = ["indie"]
    filtered = [
        t for t in FAKE_TRACKS
        if any(g in t["inferred_genres"] for g in genres)
    ]
    assert len(filtered) == 1
