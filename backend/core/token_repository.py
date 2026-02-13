class TokenRepository:
    def __init__(self):
        self._store = {}

    def save_token(self, user_id: str, token_info: dict):
        self._store[user_id] = token_info

    def get_token(self, user_id: str) -> dict | None:
        return self._store.get(user_id)