from backend.storage.memory import InMemoryTokenRepository
from backend.storage.postgres import PostgresTokenRepository
from backend.core.config import settings

_token_repo = None

def get_token_repository():
    global _token_repo
    if _token_repo:
        return _token_repo

    if settings.USE_DB:
        _token_repo = PostgresTokenRepository()
    else:
        _token_repo = InMemoryTokenRepository()

    return _token_repo
#USE_DB = True -> PostgresTokenRepository
#USE_DB = False -> InMemoryTokenRepository