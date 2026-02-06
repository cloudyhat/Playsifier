from backend.storage.base import TokenRepository

class InMemoryTokenRepository(TokenRepository):
    def __init__(self):
        self._store = {}

    def save_token(self, user_id: str, token_data: dict):
        self._store[user_id] = token_data

    def get_token(self, user_id: str):
        return self._store.get(user_id)

    def update_token(self, user_id: str, token_data: dict):
        self._store[user_id] = token_data
