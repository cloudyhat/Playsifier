from pydantic import BaseModel
from typing import Optional, List

class PromptGenerateRequest(BaseModel):
    prompt: str
    playlist_name: Optional[str] = None
