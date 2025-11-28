# Quick Demo Setup (No Deployment Needed!)

## Option 1: Local Demo (Easiest)

### Run Backend:
```bash
cd E:\clothing-inventory\mobile-inventory\backend
python main.py
```
Backend: http://localhost:8000

### Run Frontend:
```bash
cd E:\clothing-inventory\mobile-inventory\client
npm run dev
```
Frontend: http://localhost:5173

**Login:** admin@techstock.com / password123

---

## Option 2: Share with Ngrok (For Demos)

### 1. Download Ngrok:
https://ngrok.com/download

### 2. Run Backend:
```bash
cd backend
python main.py
```

### 3. Expose Backend with Ngrok:
```bash
ngrok http 8000
```

You'll get a URL like: `https://abc123.ngrok.io`

### 4. Update Frontend API URL:
In `client/src/services/api.js`:
```javascript
const API_BASE_URL = 'https://abc123.ngrok.io/api';
```

### 5. Run Frontend:
```bash
npm run dev
```

Now you can share http://localhost:5173 or deploy just the frontend!

---

## Option 3: Deploy Frontend Only

Since frontend is just HTML/JS/CSS, you can deploy it to:
- **Hostinger** (your existing hosting) ✅
- **Vercel** (free, no card needed)
- **Netlify** (free, no card needed)
- **GitHub Pages** (free)

Backend stays on your PC, frontend is public!

---

**Which option do you want to try?**
