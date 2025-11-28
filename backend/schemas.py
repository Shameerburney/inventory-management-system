from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    name: str
    role: str
    company: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(UserBase):
    id: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: User

# Product Schemas
class ProductBase(BaseModel):
    name: str
    brand: str
    model: str
    base_price: float
    stock: int
    image_url: Optional[str] = None
    client_id: Optional[str] = None

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    brand: Optional[str] = None
    model: Optional[str] = None
    base_price: Optional[float] = None
    stock: Optional[int] = None
    image_url: Optional[str] = None
    client_id: Optional[str] = None

class Product(ProductBase):
    id: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# Transaction Schemas
class TransactionBase(BaseModel):
    product_id: str
    transaction_type: str
    quantity: int
    price: float
    notes: Optional[str] = None

class TransactionCreate(TransactionBase):
    pass

class Transaction(TransactionBase):
    id: str
    user_id: str
    created_at: datetime
    
    class Config:
        from_attributes = True

# Alert Schemas
class Alert(BaseModel):
    id: str
    product_id: str
    alert_type: str
    message: str
    is_read: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# Dashboard Stats
class DashboardStats(BaseModel):
    total_stock: int
    low_stock_count: int
    total_value: float
    total_products: int
    recent_transactions: List[Transaction]
    alerts: List[Alert]
