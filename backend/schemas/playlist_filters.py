from pydantic import BaseModel
from typing import List, Optional

class PlaylistFilters(BaseModel):
    num_songs: int = 20
    max_duration_sec: Optional[int] = None

    min_energy: Optional[float] = None
    max_energy: Optional[float] = None
    min_valence: Optional[float] = None
    max_valence: Optional[float] = None

    genres: Optional[List[str]] = None
    mcp_confidence: float = 1.0
