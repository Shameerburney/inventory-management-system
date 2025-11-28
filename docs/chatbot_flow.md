# Chatbot Design and Flow

## 1. Chatbot Persona
- **Name**: "InventoryBot"
- **Tone**: Professional, efficient, and helpful.
- **Role**: Assistant to sales staff and managers for quick inventory checks.

## 2. Intent Map
The chatbot will recognize the following intents:

| Intent | Example User Queries | Bot Action |
| :--- | :--- | :--- |
| `check_stock` | "How many iPhone 13s are left?", "Stock for Samsung S24" | Query `products` collection for stock count. |
| `check_price` | "What is the price of Pixel 8?", "Cost of iPhone 14" | Query `products` for `basePrice` or variant price. |
| `low_stock_list` | "What items are low on stock?", "Show out of stock items" | Query `products` where `stock < threshold`. |
| `sales_summary` | "How many phones sold today?", "Recent sales" | Query `sales_logs` for today's count. |
| `help` | "What can you do?", "Help" | Display list of capabilities. |

## 3. Conversation Flow Logic

### Flow: Check Stock
1. **User**: "Do we have iPhone 13?"
2. **Bot**: Extracts entity "iPhone 13".
3. **Bot**: Queries Firestore `products` collection (search by name/model).
4. **Bot**:
    - *If found*: "We have 12 units of iPhone 13 in stock. (5 Midnight, 7 Starlight)"
    - *If not found*: "I couldn't find 'iPhone 13' in the inventory."

### Flow: Low Stock Alert
1. **User**: "Show low stock."
2. **Bot**: Queries Firestore for products with `stock < 5`.
3. **Bot**: "The following items are running low: \n- Samsung A54 (2 left)\n- Pixel 7a (1 left)"

## 4. Technical Implementation
- **Frontend**: React Chat Widget (e.g., `react-chat-widget` or custom UI).
- **Processing**: Simple keyword matching (Regex) or lightweight NLP (e.g., `compromise.js`) running client-side or via Firebase Cloud Functions.
- **Data Source**: Direct read-only access to Firestore `products` collection.
