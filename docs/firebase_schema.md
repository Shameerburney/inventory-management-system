# Firebase Data Structure Plan

## Collections

### 1. `products`
Stores information about mobile phone models.
- **Document ID**: Auto-generated or SKU
- **Fields**:
    - `name` (string): "iPhone 13"
    - `brand` (string): "Apple"
    - `model` (string): "13"
    - `description` (string)
    - `imageUrl` (string)
    - `basePrice` (number)
    - `supplierId` (string): Reference to `suppliers`
    - `createdAt` (timestamp)
    - `updatedAt` (timestamp)
    - `variants` (array of objects):
        - `color` (string): "Midnight"
        - `storage` (string): "128GB"
        - `stock` (number): 15
        - `price` (number): 799
        - `sku` (string): "IP13-MID-128"

### 2. `suppliers`
Stores supplier contact details.
- **Document ID**: Auto-generated
- **Fields**:
    - `name` (string): "TechDistro Inc."
    - `contactPerson` (string)
    - `email` (string)
    - `phone` (string)
    - `address` (string)

### 3. `sales_logs`
Records every sale for analytics and history.
- **Document ID**: Auto-generated
- **Fields**:
    - `productId` (string)
    - `variantSku` (string)
    - `productName` (string)
    - `quantity` (number)
    - `totalPrice` (number)
    - `saleDate` (timestamp)
    - `soldBy` (string): User ID of salesperson

### 4. `users`
Stores user profile data (linked to Auth).
- **Document ID**: User UID
- **Fields**:
    - `email` (string)
    - `role` (string): "admin", "staff"
    - `displayName` (string)

## Indexes
- **products**: Compound index on `brand` and `model` for search.
- **sales_logs**: Index on `saleDate` for time-based queries in Power BI.
