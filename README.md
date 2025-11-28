# Real-Time Inventory Management System

## 🚀 Complete Full-Stack Solution

### Features
✅ **Python Backend** (FastAPI) with real-time WebSocket support  
✅ **Cloud Database** (PostgreSQL/SQLite)  
✅ **Automated Stock Tracking** with low-stock alerts  
✅ **Real-Time APIs** for instant inventory updates  
✅ **Power BI Integration** for live analytics  
✅ **Role-Based Access** (Admin & Client portals)  
✅ **Transaction Management** (Sales, Purchases)  
✅ **JWT Authentication** with secure password hashing  

---

## 📋 Prerequisites

- **Python 3.8+** installed
- **Node.js 16+** and npm installed
- **PostgreSQL** (optional, can use SQLite for testing)

---

## 🛠️ Setup Instructions

### Step 1: Backend Setup

```bash
# Navigate to backend folder
cd mobile-inventory/backend

# Install Python dependencies
pip install -r requirements.txt

# Copy environment file
copy .env.example .env

# (Optional) Edit .env to configure PostgreSQL
# For testing, you can use SQLite (default)

# Run the backend server
python main.py
```

**Backend will run on:** http://localhost:8000  
**API Docs:** http://localhost:8000/docs

### Step 2: Frontend Setup

```bash
# Navigate to client folder
cd mobile-inventory/client

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

**Frontend will run on:** http://localhost:5173

---

## 🔐 Default Login

- **Email:** admin@techstock.com
- **Password:** password123

---

## 📊 How It Works

### 1. **Real-Time Stock Tracking**
- Every product change triggers WebSocket broadcast
- Frontend receives instant updates
- No page refresh needed

### 2. **Automated Alerts**
- System automatically detects stock < 5
- Creates alerts in database
- Sends real-time notifications

### 3. **Transaction Processing**
- **Sale:** Reduces stock automatically
- **Purchase:** Increases stock automatically
- All changes logged with timestamp

### 4. **Role-Based Access**
- **Admin:** Full access to all features
- **Client:** View only their assigned products

### 5. **Power BI Integration**
- Export data via API endpoints
- Connect Power BI to REST API
- Auto-refresh dashboards

---

## 🌐 API Endpoints

### Authentication
```
POST /api/auth/login
POST /api/auth/register
GET  /api/auth/me
```

### Products
```
GET    /api/products
POST   /api/products
PUT    /api/products/{id}
DELETE /api/products/{id}
```

### Transactions
```
GET  /api/transactions
POST /api/transactions
```

### Dashboard
```
GET /api/dashboard/stats
```

### Alerts
```
GET /api/alerts
PUT /api/alerts/{id}/read
```

### WebSocket
```
WS /ws (Real-time updates)
```

---

## 🔄 Real-Time Features

### WebSocket Events
The system broadcasts these events in real-time:

- `product_created` - New product added
- `product_updated` - Product modified
- `product_deleted` - Product removed
- `transaction_created` - New sale/purchase
- `alert_created` - Low stock alert

### Frontend Auto-Updates
- Dashboard stats refresh automatically
- Product list updates instantly
- Alerts appear in real-time

---

## 📈 Power BI Setup

### Method 1: REST API Connection
1. Open Power BI Desktop
2. Get Data → Web
3. Enter: `http://localhost:8000/api/products`
4. Add Authorization header: `Bearer YOUR_JWT_TOKEN`
5. Load and transform data

### Method 2: Export to Excel
1. Use API to fetch data
2. Export to CSV/Excel
3. Import into Power BI
4. Set up auto-refresh

---

## 🗄️ Database Schema

### Users
- id, email, password, name, role, company, created_at

### Products
- id, name, brand, model, base_price, stock, client_id, created_at, updated_at

### Transactions
- id, product_id, user_id, type, quantity, price, notes, created_at

### Alerts
- id, product_id, alert_type, message, is_read, created_at

---

## 🚀 Production Deployment

### Backend (Python)
```bash
# Using Gunicorn
gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000

# Using Docker
docker build -t inventory-backend .
docker run -p 8000:8000 inventory-backend
```

### Frontend (React)
```bash
# Build for production
npm run build

# Deploy to Vercel/Netlify/AWS S3
```

### Database
- **Development:** SQLite (included)
- **Production:** PostgreSQL on AWS RDS / Azure Database / Heroku Postgres

---

## 🔒 Security Checklist

- [ ] Change `SECRET_KEY` in `.env`
- [ ] Use strong passwords
- [ ] Enable HTTPS in production
- [ ] Configure CORS for production domains
- [ ] Regular database backups
- [ ] Update dependencies regularly

---

## 📱 Features Breakdown

### Admin Features
- ✅ Full product CRUD
- ✅ Create client accounts
- ✅ View all transactions
- ✅ Assign products to clients
- ✅ Export data for Power BI
- ✅ Real-time dashboard
- ✅ Chatbot for queries

### Client Features
- ✅ View assigned products (read-only)
- ✅ See stock levels
- ✅ View transaction history
- ✅ Real-time updates

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check Python version
python --version

# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

### Frontend can't connect to API
- Ensure backend is running on port 8000
- Check CORS settings in `main.py`
- Verify API_BASE_URL in `api.js`

### Database errors
```bash
# Reset database (development only)
rm inventory.db
python main.py
```

---

## 📞 Support

For issues or questions, check:
- Backend logs in terminal
- Frontend console (F12)
- API documentation at http://localhost:8000/docs

---

## 🎯 Next Steps

1. **Start Backend:** `cd backend && python main.py`
2. **Start Frontend:** `cd client && npm run dev`
3. **Login:** Use admin@techstock.com / password123
4. **Create Clients:** Go to Clients menu
5. **Add Products:** Go to Products menu
6. **Test Real-Time:** Open in 2 browsers, make changes

---

**Built with ❤️ using Python FastAPI + React + PostgreSQL**
