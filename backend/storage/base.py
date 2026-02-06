from abc import ABC, abstractmethod

class TokenRepository(ABC):

    @abstractmethod
    def save_token(self, user_id: str, token_data: dict):
        pass

    @abstractmethod
    def get_token(self, user_id: str) -> dict | None:
        pass

    @abstractmethod
    def update_token(self, user_id: str, token_data: dict):
        pass