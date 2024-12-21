from abc import ABC, abstractmethod


class BaseAgent(ABC):
    def __init__(self, model: str):
        self.model = model

    @abstractmethod
    def run(self):
        pass
