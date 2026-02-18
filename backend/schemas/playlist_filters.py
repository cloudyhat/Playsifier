from pydantic import BaseModel
from typing import List, Optional

class PlaylistFilters(BaseModel):
    num_songs: int = 20
    max_duration_sec: Optional[int] = None
    genres: Optional[List[str]] = None
    mood: Optional[str] = None  
    mcp_confidence: float = 1.0