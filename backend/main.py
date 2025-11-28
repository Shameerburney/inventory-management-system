from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import json
import uuid
from datetime import datetime, timedelta

from database import get_db, init_db, User as DBUser, Product as DBProduct, Transaction as DBTransaction, Alert as DBAlert
from schemas import (
    UserCreate, UserLogin, Token, User,
    ProductCreate, ProductUpdate, Product,
    TransactionCreate, Transaction,
    DashboardStats, Alert
)
from auth import (
    get_password_hash, verify_password, create_access_token,
    get_current_user, get_current_admin, ACCESS_TOKEN_EXPIRE_MINUTES
)

app = FastAPI(title="Inventory Management API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# WebSocket connections for real-time updates
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except:
                pass

manager = ConnectionManager()

# Initialize database
@app.on_event("startup")
def startup():
    init_db()
    # Create default admin user
    db = next(get_db())
    admin = db.query(DBUser).filter(DBUser.email == "admin@techstock.com").first()
    if not admin:
        admin = DBUser(
            id=str(uuid.uuid4()),
            email="admin@techstock.com",
            password=get_password_hash("password123"),
            name="Admin User",
            role="admin"
        )
        db.add(admin)
        db.commit()

# WebSocket endpoint for real-time updates
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # Keep connection alive
    except WebSocketDisconnect:
        manager.disconnect(websocket)

# ============ AUTH ROUTES ============
@app.post("/api/auth/register", response_model=User)
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(DBUser).filter(DBUser.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    new_user = DBUser(
        id=str(uuid.uuid4()),
        email=user.email,
        password=hashed_password,
        name=user.name,
        role=user.role,
        company=user.company
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/api/auth/login", response_model=Token)
def login(user_login: UserLogin, db: Session = Depends(get_db)):
    user = db.query(DBUser).filter(DBUser.email == user_login.email).first()
    if not user or not verify_password(user_login.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.id}, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user
    }

@app.get("/api/auth/me", response_model=User)
def get_me(current_user: DBUser = Depends(get_current_user)):
    return current_user

# ============ USER ROUTES ============
@app.get("/api/users", response_model=List[User])
def get_users(
    db: Session = Depends(get_db),
    current_user: DBUser = Depends(get_current_admin)
):
    users = db.query(DBUser).all()
    return users

@app.delete("/api/users/{user_id}")
def delete_user(
    user_id: str,
    db: Session = Depends(get_db),
    current_user: DBUser = Depends(get_current_admin)
):
    user = db.query(DBUser).filter(DBUser.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"message": "User deleted"}

# ============ PRODUCT ROUTES ============
@app.get("/api/products", response_model=List[Product])
def get_products(
    db: Session = Depends(get_db),
    current_user: DBUser = Depends(get_current_user)
):
    if current_user.role == "admin":
        products = db.query(DBProduct).all()
    else:
        products = db.query(DBProduct).filter(DBProduct.client_id == current_user.id).all()
    return products

@app.post("/api/products", response_model=Product)
async def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db),
    current_user: DBUser = Depends(get_current_admin)
):
    new_product = DBProduct(
        id=str(uuid.uuid4()),
        **product.dict()
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    
    # Broadcast real-time update
    await manager.broadcast({
        "type": "product_created",
        "data": Product.from_orm(new_product).dict()
    })
    
    return new_product

@app.put("/api/products/{product_id}", response_model=Product)
async def update_product(
    product_id: str,
    product_update: ProductUpdate,
    db: Session = Depends(get_db),
    current_user: DBUser = Depends(get_current_admin)
):
    product = db.query(DBProduct).filter(DBProduct.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    for key, value in product_update.dict(exclude_unset=True).items():
        setattr(product, key, value)
    
    product.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(product)
    
    # Check for low stock and create alert
    if product.stock < 5:
        check_and_create_alert(db, product)
    
    # Broadcast real-time update
    await manager.broadcast({
        "type": "product_updated",
        "data": Product.from_orm(product).dict()
    })
    
    return product

@app.delete("/api/products/{product_id}")
async def delete_product(
    product_id: str,
    db: Session = Depends(get_db),
    current_user: DBUser = Depends(get_current_admin)
):
    product = db.query(DBProduct).filter(DBProduct.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    db.delete(product)
    db.commit()
    
    # Broadcast real-time update
    await manager.broadcast({
        "type": "product_deleted",
        "data": {"id": product_id}
    })
    
    return {"message": "Product deleted"}

# ============ TRANSACTION ROUTES ============
@app.post("/api/transactions", response_model=Transaction)
async def create_transaction(
    transaction: TransactionCreate,
    db: Session = Depends(get_db),
    current_user: DBUser = Depends(get_current_user)
):
    # Create transaction
    new_transaction = DBTransaction(
        id=str(uuid.uuid4()),
        user_id=current_user.id,
        **transaction.dict()
    )
    db.add(new_transaction)
    
    # Update product stock
    product = db.query(DBProduct).filter(DBProduct.id == transaction.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    if transaction.transaction_type == "sale":
        product.stock -= transaction.quantity
    elif transaction.transaction_type == "purchase":
        product.stock += transaction.quantity
    
    db.commit()
    db.refresh(new_transaction)
    
    # Check for low stock
    if product.stock < 5:
        check_and_create_alert(db, product)
    
    # Broadcast real-time update
    await manager.broadcast({
        "type": "transaction_created",
        "data": Transaction.from_orm(new_transaction).dict()
    })
    
    return new_transaction

@app.get("/api/transactions", response_model=List[Transaction])
def get_transactions(
    db: Session = Depends(get_db),
    current_user: DBUser = Depends(get_current_user)
):
    transactions = db.query(DBTransaction).order_by(DBTransaction.created_at.desc()).limit(50).all()
    return transactions

# ============ DASHBOARD ROUTES ============
@app.get("/api/dashboard/stats", response_model=DashboardStats)
def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_user: DBUser = Depends(get_current_user)
):
    if current_user.role == "admin":
        products = db.query(DBProduct).all()
    else:
        products = db.query(DBProduct).filter(DBProduct.client_id == current_user.id).all()
    
    total_stock = sum(p.stock for p in products)
    low_stock_count = sum(1 for p in products if p.stock < 5)
    total_value = sum(p.stock * p.base_price for p in products)
    
    recent_transactions = db.query(DBTransaction).order_by(DBTransaction.created_at.desc()).limit(10).all()
    alerts = db.query(DBAlert).filter(DBAlert.is_read == False).order_by(DBAlert.created_at.desc()).all()
    
    return {
        "total_stock": total_stock,
        "low_stock_count": low_stock_count,
        "total_value": total_value,
        "total_products": len(products),
        "recent_transactions": recent_transactions,
        "alerts": alerts
    }

# ============ ALERT ROUTES ============
@app.get("/api/alerts", response_model=List[Alert])
def get_alerts(
    db: Session = Depends(get_db),
    current_user: DBUser = Depends(get_current_user)
):
    alerts = db.query(DBAlert).filter(DBAlert.is_read == False).order_by(DBAlert.created_at.desc()).all()
    return alerts

@app.put("/api/alerts/{alert_id}/read")
def mark_alert_read(
    alert_id: str,
    db: Session = Depends(get_db),
    current_user: DBUser = Depends(get_current_user)
):
    alert = db.query(DBAlert).filter(DBAlert.id == alert_id).first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    
    alert.is_read = True
    db.commit()
    return {"message": "Alert marked as read"}

# Helper function
def check_and_create_alert(db: Session, product: DBProduct):
    existing_alert = db.query(DBAlert).filter(
        DBAlert.product_id == product.id,
        DBAlert.is_read == False
    ).first()
    
    if not existing_alert:
        alert_type = "out_of_stock" if product.stock == 0 else "low_stock"
        message = f"{product.name} is {'out of stock' if product.stock == 0 else 'running low'} (Stock: {product.stock})"
        
        alert = DBAlert(
            id=str(uuid.uuid4()),
            product_id=product.id,
            alert_type=alert_type,
            message=message
        )
        db.add(alert)
        db.commit()

if __name__ == "__main__":
    import uvicorn
    import os
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
