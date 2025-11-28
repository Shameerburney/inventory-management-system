# Real-Time Inventory Management System - Backend

## Features
✅ Python FastAPI backend with real-time WebSocket support
✅ PostgreSQL/SQLite database with SQLAlchemy ORM
✅ JWT authentication with role-based access control
✅ Automated low-stock alerts
✅ Real-time inventory updates
✅ Transaction tracking (sales, purchases)
✅ Power BI data export ready

## Setup Instructions

### 1. Install Python Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment
```bash
# Copy example env file
copy .env.example .env

# Edit .env and update:
# - DATABASE_URL (use PostgreSQL or keep SQLite for testing)
# - SECRET_KEY (generate a secure key)
```

### 3. Run the Backend
```bash
# Development mode with auto-reload
python main.py

# Or using uvicorn directly
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 4. Access API Documentation
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user info

### Products
- `GET /api/products` - Get all products (filtered by role)
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/{id}` - Update product (admin only)
- `DELETE /api/products/{id}` - Delete product (admin only)

### Transactions
- `GET /api/transactions` - Get transaction history
- `POST /api/transactions` - Create transaction (auto-updates stock)

### Dashboard
- `GET /api/dashboard/stats` - Get real-time dashboard statistics

### Alerts
- `GET /api/alerts` - Get unread alerts
- `PUT /api/alerts/{id}/read` - Mark alert as read

### WebSocket
- `WS /ws` - Real-time updates connection

## Database Schema

### Users Table
- id, email, password (hashed), name, role, company, created_at

### Products Table
- id, name, brand, model, base_price, stock, image_url, client_id, created_at, updated_at

### Transactions Table
- id, product_id, user_id, transaction_type, quantity, price, notes, created_at

### Alerts Table
- id, product_id, alert_type, message, is_read, created_at

## Real-Time Features

### WebSocket Updates
The system broadcasts real-time updates for:
- Product created/updated/deleted
- Transaction created
- Stock level changes
- New alerts

### Automated Alerts
- Automatically creates alerts when stock < 5
- Alerts for out-of-stock items
- Real-time notification to connected clients

## Power BI Integration

### Export Data
Use the API endpoints to fetch data:
```python
# Get all products
GET /api/products

# Get all transactions
GET /api/transactions

# Get dashboard stats
GET /api/dashboard/stats
```

### Connect Power BI
1. Use "Web" data source in Power BI
2. Enter API endpoint URL
3. Add Bearer token authentication
4. Refresh data automatically

## Production Deployment

### Using PostgreSQL
1. Install PostgreSQL
2. Create database: `CREATE DATABASE inventory_db;`
3. Update DATABASE_URL in .env
4. Run migrations

### Using Docker
```bash
# Build image
docker build -t inventory-backend .

# Run container
docker run -p 8000:8000 inventory-backend
```

### Cloud Deployment
- **AWS**: Use EC2 + RDS PostgreSQL
- **Azure**: Use App Service + Azure Database
- **Heroku**: Deploy with Heroku Postgres addon

## Security Notes
- Change SECRET_KEY in production
- Use HTTPS in production
- Enable CORS only for trusted origins
- Use strong passwords
- Regularly backup database

## Default Admin Account
- Email: admin@techstock.com
- Password: password123
- **Change this immediately in production!**
