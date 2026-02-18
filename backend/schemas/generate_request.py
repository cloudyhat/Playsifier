from pydantic import BaseModel
from typing import Optional, List

class GenerateRequest(BaseModel):
    num_songs: int
    max_duration_sec: Optional[int] = None
    genres: Optional[List[str]] = None
    mood: Optional[str] = None