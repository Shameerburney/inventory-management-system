# Power BI Dashboard Preview & Plan

## 1. Data Connection
Power BI will connect to the Firebase Firestore database.
- **Method**: Export Firestore data to JSON/CSV periodically OR use a third-party connector (e.g., CData) for direct query.
- **Tables**: `Products`, `SalesLogs`, `Suppliers`.

## 2. Proposed Dashboards

### A. Executive Overview
*High-level metrics for management.*
- **KPI Cards**: Total Inventory Value, Total Units in Stock, Total Sales (This Month).
- **Chart**: Monthly Sales Trend (Line Chart).
- **Chart**: Top 5 Best Selling Models (Bar Chart).

### B. Inventory Health
*Focus on stock levels and restocking needs.*
- **Visual**: "Days of Inventory Remaining" (calculated based on sales velocity).
- **Table**: Low Stock Alert List (Items with stock < 5).
- **Chart**: Stock Distribution by Brand (Pie Chart).

### C. Sales Performance
*Detailed sales analysis.*
- **Matrix**: Sales by Model and Color/Variant.
- **Map**: Sales by Region (if location data is added).
- **Slicer**: Date Range Picker (Last 7 days, 30 days, YTD).

## 3. Data Model Relationships
- `SalesLogs[productId]` -> `Products[id]` (Many-to-One)
- `Products[supplierId]` -> `Suppliers[id]` (Many-to-One)

## 4. Visual Layout Mockup (Description)
*   **Header**: Logo, Title "Mobile Inventory Analytics", Date Filter.
*   **Top Row**: 3 Big Number Cards (Total Stock, Sales Today, Revenue).
*   **Middle Row**:
    *   Left: Line chart "Sales over last 30 days".
    *   Right: Donut chart "Inventory by Brand" (Apple vs Samsung vs Pixel).
*   **Bottom Row**: Detailed Table "Low Stock Items" (Sorted by lowest quantity).
