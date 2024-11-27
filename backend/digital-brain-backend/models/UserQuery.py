from pydantic import BaseModel
from datetime import datetime

class UserQuery(BaseModel):
    query: str
    user_id: str
    created_at: datetime
    updated_at: datetime

