from pydantic import BaseModel
from typing import Optional

class GenerateRequest(BaseModel):
    user_id: str
    num_songs: int = 20
    max_duration_sec: Optional[int] = None
