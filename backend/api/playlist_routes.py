from fastapi import APIRouter
from backend.schemas.generate_request import GenerateRequest
from backend.schemas.prompt_request import PromptGenerateRequest
from backend.schemas.playlist_filters import PlaylistFilters
from backend.spotify.playlist_service import create_playlist_from_library
from backend.mcp.prompt_parser import parse_prompt

router = APIRouter()


@router.post("/generate")
def generate_structured(req: GenerateRequest):
    filters = PlaylistFilters(
        num_songs=req.num_songs,
        max_duration_sec=req.max_duration_sec,
        mcp_confidence=0.8
    )

    url = create_playlist_from_library(req.user_id, filters)

    return {
        "playlist_url": url,
        "filters": filters.dict()
    }



@router.post("/generate-from-prompt")
def generate_from_prompt(req: PromptGenerateRequest):
    filters = parse_prompt(req.prompt)


    filters.mcp_confidence = 0.8

    url = create_playlist_from_library(req.user_id, filters)

    return {
        "playlist_url": url,
        "filters": filters.dict(),
        "prompt": req.prompt
    }
