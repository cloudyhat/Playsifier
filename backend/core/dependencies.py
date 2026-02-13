from backend.core.token_repository import TokenRepository

_token_repo = TokenRepository()

def get_token_repository() -> TokenRepository:
    return _token_repo