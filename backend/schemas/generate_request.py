from pydantic import BaseModel
from typing import Optional

class GenerateRequest(BaseModel):
    num_songs: int
    max_duration_sec: int | None = None
