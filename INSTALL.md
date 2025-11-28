# Installation Guide

## Download & Extract

1. Download the ZIP file from GitHub releases
2. Extract to your desired location
3. Follow the setup instructions below

## Quick Setup

### Backend Setup (5 minutes)

1. Open Command Prompt/Terminal
2. Navigate to the backend folder:
   ```bash
   cd path\to\inventory-management-system\backend
   ```
3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the backend:
   ```bash
   python main.py
   ```
5. Backend is now running on http://localhost:8000

### Frontend Setup (5 minutes)

1. Open a NEW Command Prompt/Terminal
2. Navigate to the client folder:
   ```bash
   cd path\to\inventory-management-system\client
   ```
3. Install Node dependencies:
   ```bash
   npm install
   ```
4. Run the frontend:
   ```bash
   npm run dev
   ```
5. Frontend is now running on http://localhost:5173

## Access the Application

1. Open your browser
2. Go to: http://localhost:5173
3. Login with:
   - Email: `admin@techstock.com`
   - Password: `password123`

## Troubleshooting

### Python not found
- Install Python 3.10+ from https://python.org
- Make sure to check "Add Python to PATH" during installation

### Node/npm not found
- Install Node.js 16+ from https://nodejs.org
- Restart your terminal after installation

### Port already in use
- Backend: Change port in `backend/main.py` (line 351)
- Frontend: Change port in `client/vite.config.js`

## Need Help?

Check the main README.md file for detailed documentation!
