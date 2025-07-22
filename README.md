# Zen POS System

A modern, full-stack Point of Sale system designed to be light-weight, simple and efficient.

## Features
- **Sales Processing**: Handle transactions and receipts
- **Inventory Management**: Track products, stock levels, and categories
- **User Management**: Role-based access (Admin, Cashier)
- **Reporting**: Generate daily sales reports
- **Rewards Program**: Store customer information and apply discount to participating customers

## Tech Stack
| Component       | Technology           |
|----------------|---------------------|
| Frontend       | React.js, CSS       |
| Backend        | Java (Spring Boot)  |
| Database       | PostgreSQL          |
| Build Tool     | Maven               |

## Installation

### Prerequisites
- Node.js v16+
- Java JDK 17
- PostgreSQL 14+
- Maven 3.8+

### Frontend Setup
Open git bash terminal.
```bash
# Navigate to frontend directory.
cd frontend
# Install dependencies and run frontend.
npm install
npm start
```

### Backend Setup
- Create postgres database in your preferred IDE.
- Create/verify the zenpos database in the IDE.
- Configure database login information in src/main/resources/application.properties.
- Select 'Run' in the IDE.
