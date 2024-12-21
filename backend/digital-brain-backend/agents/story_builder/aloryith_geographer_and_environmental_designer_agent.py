from langchain import hub
from setup import get_4o_llm


class AloryithGeographerAndEnvironmentalDesignerAgent:
    def __init__(self):
        self.prompt = hub.pull("aloryith-environment-design")

    def run(self, user_input: str):
        llm = get_4o_llm()
        prompt_value = self.prompt.invoke(user_input)
        return llm.invoke(prompt_value).content
