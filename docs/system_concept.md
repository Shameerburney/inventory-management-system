# System Concept Document: Mobile Phone Inventory System

## 1. Project Overview
The Mobile Phone Inventory System is a comprehensive digital solution designed to streamline the management of mobile phone stock. It integrates a web-based dashboard for inventory control, a custom chatbot for quick queries, a Firebase backend for real-time data synchronization, and Power BI for advanced analytics.

## 2. Core Components

### A. Inventory Dashboard (Web Application)
- **Purpose**: Central hub for inventory management.
- **Key Features**:
    - **Real-time Stock View**: Displays total phones, sold items, and low stock alerts.
    - **Product Management**: Add, edit, and remove phone models with variants (color, storage).
    - **Supplier Management**: Track supplier details and purchase prices.
    - **Visual Alerts**: Color-coded indicators for low stock levels.

### B. Custom Chatbot
- **Purpose**: AI-powered assistant for instant inventory information.
- **Key Features**:
    - **Natural Language Queries**: "Do we have iPhone 13 in stock?"
    - **Real-time Responses**: Fetches live data from Firebase.
    - **Sales Insights**: Provides quick summaries of recent sales.

### C. Firebase Backend
- **Purpose**: Scalable, real-time database and authentication provider.
- **Key Features**:
    - **Firestore**: Stores products, stock levels, sales logs, and supplier info.
    - **Authentication**: Secure login for dashboard users.
    - **Storage**: Hosting for product images.

### D. Power BI Analytics
- **Purpose**: Business intelligence and reporting.
- **Key Features**:
    - **Visual Reports**: Sales trends, stock movement, and forecasting.
    - **Interactive Dashboards**: Drill down into specific brands or time periods.

## 3. User Flow Example
1. **Manager** logs into the **Dashboard** to add a shipment of new Samsung S24 units.
2. **Firebase** updates the stock level immediately.
3. **Salesperson** asks the **Chatbot**: "How many S24s do we have?"
4. **Chatbot** queries **Firebase** and responds: "We have 50 units of Samsung S24."
5. **Executive** views **Power BI** report to see the sales trend of Samsung devices over the last month.

## 4. Technology Stack
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Firebase (Firestore, Auth)
- **Analytics**: Power BI
- **Chatbot**: Custom React Widget / Firebase Cloud Functions
