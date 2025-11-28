# 📦 Real-Time Inventory Management System

A complete full-stack inventory management system with Python FastAPI backend and React frontend, featuring real-time updates, automated alerts, and role-based access control.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Python](https://img.shields.io/badge/python-3.10-green)
![React](https://img.shields.io/badge/react-19-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin & Client)
- Secure password hashing
- Session management

### 📊 Inventory Management
- Complete CRUD operations for products
- Real-time stock tracking
- Low stock alerts (automatic when stock < 5)
- Product assignment to clients
- Transaction history (sales, purchases)

### 👥 User Management
- Admin can create client accounts
- Clients see only their assigned products
- User profile management
- Multi-tenant support

### 📈 Dashboard & Analytics
- Real-time statistics
- Total stock count
- Low stock warnings
- Total inventory value
- Recent transactions
- Visual analytics

### 🔔 Real-Time Features
- WebSocket support for live updates
- Automated low-stock alerts
- Instant inventory updates across all users
- Real-time notifications

### 💬 AI Chatbot
- Natural language inventory queries
- Stock level checks
- Product information lookup
- Interactive assistance

### 📤 Data Export
- JSON export for Power BI
- CSV export capability
- API endpoints for external integrations

## 🛠️ Tech Stack

### Backend
- **Python 3.10**
- **FastAPI** - Modern web framework
- **SQLAlchemy** - ORM
- **SQLite/PostgreSQL** - Database
- **Pydantic** - Data validation
- **python-jose** - JWT tokens
- **Uvicorn** - ASGI server

### Frontend
- **React 19**
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Router** - Navigation

## 📋 Prerequisites

- Python 3.10 or higher
- Node.js 16 or higher
- npm or yarn
- Git

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Shameerburney/inventory-management-system.git
cd inventory-management-system
```

### 2. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
copy .env.example .env

# Run the backend
python main.py
```

**Backend will run on:** http://localhost:8000

**API Documentation:** http://localhost:8000/docs

### 3. Frontend Setup

```bash
# Open a new terminal
# Navigate to client folder
cd client

# Install dependencies
npm install

# Run the development server
npm run dev
```

**Frontend will run on:** http://localhost:5173

### 4. Login

Open http://localhost:5173 in your browser

**Default Admin Credentials:**
- Email: `admin@techstock.com`
- Password: `password123`

⚠️ **Change these credentials in production!**

## 📁 Project Structure

```
inventory-management-system/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── database.py          # Database models
│   ├── schemas.py           # Pydantic schemas
│   ├── auth.py              # Authentication logic
│   ├── requirements.txt     # Python dependencies
│   ├── .env.example         # Environment variables template
│   └── README.md            # Backend documentation
│
├── client/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── public/              # Static assets
│   ├── package.json         # Node dependencies
│   └── vite.config.js       # Vite configuration
│
├── README.md                # This file
└── .gitignore              # Git ignore rules
```

## 🔧 Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` folder:

```env
DATABASE_URL=sqlite:///./inventory.db
SECRET_KEY=your-super-secret-key-change-this
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Frontend API Configuration

Update `client/src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:8000/api';
```

## 📖 API Documentation

Once the backend is running, visit:
- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

### Main Endpoints

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Register new user
- `GET /api/auth/me` - Get current user

#### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

#### Users
- `GET /api/users` - Get all users (admin only)
- `DELETE /api/users/{id}` - Delete user (admin only)

#### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

#### Transactions
- `GET /api/transactions` - Get transaction history
- `POST /api/transactions` - Create transaction

#### Alerts
- `GET /api/alerts` - Get unread alerts
- `PUT /api/alerts/{id}/read` - Mark alert as read

## 👥 User Roles

### Admin
- Full access to all features
- Create and manage client accounts
- Assign products to clients
- View all inventory
- Manage all transactions
- Access analytics

### Client
- View assigned products only (read-only)
- See stock levels
- View transaction history
- Limited dashboard access

## 🎯 Usage Guide

### Creating a Client Account (Admin)

1. Login as admin
2. Go to "Clients" menu
3. Click "+ New Client"
4. Fill in client details
5. Click "Create Client Account"

### Assigning Products to Clients (Admin)

1. Go to "Products" menu
2. Click "Add Product" or edit existing
3. Select client from "Assign to Client" dropdown
4. Save product

### Client Login

1. Use credentials provided by admin
2. See only assigned products
3. View stock levels and history

### Managing Inventory

1. **Add Product:** Products → Add Product
2. **Update Stock:** Edit product and change stock value
3. **Record Transaction:** Create sale or purchase transaction
4. **View Alerts:** Check notification bell for low stock alerts

## 🔔 Alerts System

The system automatically creates alerts when:
- Product stock falls below 5 units (low stock)
- Product stock reaches 0 (out of stock)

Alerts appear in:
- Red bell icon (top right)
- Dashboard alerts section
- Real-time notifications

## 📊 Power BI Integration

### Export Data

Use API endpoints to fetch data:

```bash
# Get all products
GET http://localhost:8000/api/products

# Get all transactions
GET http://localhost:8000/api/transactions

# Get dashboard stats
GET http://localhost:8000/api/dashboard/stats
```

### Connect Power BI

1. Open Power BI Desktop
2. Get Data → Web
3. Enter API endpoint URL
4. Add Authorization header: `Bearer YOUR_JWT_TOKEN`
5. Load and transform data

## 🚀 Deployment

### Backend Deployment

**Options:**
- Railway.app
- Render.com
- Heroku
- AWS EC2
- DigitalOcean
- Your own VPS

**Steps:**
1. Push code to GitHub
2. Connect deployment platform to repository
3. Set environment variables
4. Deploy!

### Frontend Deployment

**Options:**
- Vercel (recommended)
- Netlify
- AWS S3 + CloudFront
- Your own hosting

**Steps:**
1. Build: `npm run build`
2. Deploy `dist` folder
3. Update API URL in production

## 🐛 Troubleshooting

### Backend won't start

```bash
# Check Python version
python --version

# Reinstall dependencies
pip install -r requirements.txt --force-reinstall

# Check if port 8000 is in use
netstat -ano | findstr :8000
```

### Frontend can't connect to API

- Ensure backend is running on port 8000
- Check CORS settings in `backend/main.py`
- Verify API_BASE_URL in `client/src/services/api.js`

### Database errors

```bash
# Reset database (development only)
cd backend
del inventory.db
python main.py
```

## 🔒 Security Notes

⚠️ **Important for Production:**

- [ ] Change `SECRET_KEY` in `.env`
- [ ] Change default admin password
- [ ] Use strong passwords for all users
- [ ] Enable HTTPS
- [ ] Configure CORS for specific domains only
- [ ] Use PostgreSQL instead of SQLite
- [ ] Regular database backups
- [ ] Keep dependencies updated

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👨‍💻 Author

**Shameer Burney**
- GitHub: [@Shameerburney](https://github.com/Shameerburney)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For issues or questions:
- Check the documentation
- Review API docs at http://localhost:8000/docs
- Open an issue on GitHub

## 🎉 Acknowledgments

- Built with FastAPI and React
- Styled with Tailwind CSS
- Icons from Heroicons
- Inspired by modern inventory management systems

---

**Made with ❤️ by Shameer Burney**
