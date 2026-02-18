from pydantic import BaseModel

class PromptGenerateRequest(BaseModel):
    prompt: str
