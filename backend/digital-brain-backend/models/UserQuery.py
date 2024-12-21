from enum import Enum
from pydantic import BaseModel
from datetime import datetime


class MessageType(Enum):
    USER = "user"
    SYSTEM = "system"
    ASSISTANT = "assistant"
    AGENT = "agent"


class UserQuery(BaseModel):
    id: str
    content: str
    type: MessageType
    user_id: str
    created_at: datetime
    updated_at: datetime
