from backend.storage.base import TokenRepository

class PostgresTokenRepository(TokenRepository):
    def save_token(self, user_id: str, token_data: dict):
        raise NotImplementedError

    def get_token(self, user_id: str):
        raise NotImplementedError

    def update_token(self, user_id: str, token_data: dict):
        raise NotImplementedError
