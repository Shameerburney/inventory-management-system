# System Architecture Diagram

```mermaid
graph TD
    subgraph Client_Side ["Client Side"]
        Dashboard[Inventory Dashboard (React)]
        Chatbot[Custom Chatbot Interface]
    end

    subgraph Backend_Services ["Backend Services (Firebase)"]
        Auth[Firebase Authentication]
        Firestore[(Firestore Database)]
        Storage[Firebase Storage]
    end

    subgraph Analytics ["Analytics Layer"]
        PowerBI[Power BI Dashboard]
    end

    %% Data Flow
    Dashboard -->|Read/Write Product Data| Firestore
    Dashboard -->|Upload Images| Storage
    Dashboard -->|Authenticate| Auth
    
    Chatbot -->|Query Stock Levels| Firestore
    Chatbot -->|Read Product Details| Firestore
    
    PowerBI -->|Import Data for Reporting| Firestore

    %% User Interactions
    User[Admin / Staff] -->|Manage Inventory| Dashboard
    User -->|Ask Questions| Chatbot
    Exec[Executive] -->|View Reports| PowerBI
```
