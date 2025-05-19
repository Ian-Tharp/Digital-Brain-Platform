import sys
from pathlib import Path
from unittest.mock import patch
import types

# Ensure backend package path is discoverable
sys.path.append(str(Path(__file__).resolve().parents[1]))

# Provide minimal stubs for external dependencies
langchain_openai = types.ModuleType("langchain_openai")
langchain_openai.ChatOpenAI = object
langchain_openai.OpenAIEmbeddings = object
sys.modules.setdefault("langchain_openai", langchain_openai)

openai = types.ModuleType("openai")
openai.Client = object
sys.modules.setdefault("openai", openai)

schema_module = types.ModuleType("langchain.schema")

class _Msg:
    def __init__(self, content: str = ""):
        self.content = content

class AIMessage(_Msg):
    pass

class SystemMessage(_Msg):
    pass

class HumanMessage(_Msg):
    pass

schema_module.AIMessage = AIMessage
schema_module.SystemMessage = SystemMessage
schema_module.HumanMessage = HumanMessage
sys.modules.setdefault("langchain.schema", schema_module)
sys.modules.setdefault("langchain", types.ModuleType("langchain"))

import agents.ideation.convergence as convergence

class DummyLLM:
    def __init__(self, message):
        self.message = message
    def invoke(self, messages):
        return self.message

def test_returns_stripped_content(monkeypatch):
    dummy_message = AIMessage(content="  hello  ")
    monkeypatch.setattr(convergence, "get_o3_mini_llm", lambda: DummyLLM(dummy_message))
    with patch("builtins.print"):
        result = convergence.convergence_thinking("some input")
    assert result == "hello"

def test_logs_ai_message(monkeypatch):
    dummy_message = AIMessage(content="  hi ")
    monkeypatch.setattr(convergence, "get_o3_mini_llm", lambda: DummyLLM(dummy_message))
    with patch("builtins.print") as mock_print:
        convergence.convergence_thinking("input")
    mock_print.assert_called_once_with("Convergence response: ", dummy_message)
