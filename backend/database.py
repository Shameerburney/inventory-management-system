from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./inventory.db")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database Models
class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    name = Column(String)
    role = Column(String)  # admin, client
    company = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    products = relationship("Product", back_populates="client")
    transactions = relationship("Transaction", back_populates="user")

class Product(Base):
    __tablename__ = "products"
    
    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    brand = Column(String)
    model = Column(String)
    base_price = Column(Float)
    stock = Column(Integer)
    image_url = Column(String, nullable=True)
    client_id = Column(String, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    client = relationship("User", back_populates="products")
    transactions = relationship("Transaction", back_populates="product")

class Transaction(Base):
    __tablename__ = "transactions"
    
    id = Column(String, primary_key=True, index=True)
    product_id = Column(String, ForeignKey("products.id"))
    user_id = Column(String, ForeignKey("users.id"))
    transaction_type = Column(String)  # sale, purchase, adjustment
    quantity = Column(Integer)
    price = Column(Float)
    notes = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    product = relationship("Product", back_populates="transactions")
    user = relationship("User", back_populates="transactions")

class Alert(Base):
    __tablename__ = "alerts"
    
    id = Column(String, primary_key=True, index=True)
    product_id = Column(String, ForeignKey("products.id"))
    alert_type = Column(String)  # low_stock, out_of_stock
    message = Column(String)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

# Create all tables
def init_db():
    Base.metadata.create_all(bind=engine)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
