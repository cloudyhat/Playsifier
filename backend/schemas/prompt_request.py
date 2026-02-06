from pydantic import BaseModel

class PromptGenerateRequest(BaseModel):
    user_id: str
    prompt: str
