# Car Repair and Payment Management System (CRPMS)

A web-based application for managing car repairs, services, and payments.

## Features

- Car Management
- Service Management
- Service Records
- Payment Processing
- Daily Reports
- User Authentication

## Tech Stack

- Frontend: React.js with Tailwind CSS
- Backend: Node.js with Express.js
- Database: MySQL
- Authentication: JWT

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- XAMPP (for local development)

## Setup Instructions

1. Clone the repository
```bash
git clone [repository-url]
```

2. Database Setup
- Start XAMPP and ensure MySQL service is running
- Create a new database named `crpms`
- Import the database schema from `database/crpms.sql`

3. Install dependencies
```bash
# Backend
cd backend-project
npm install

# Frontend
cd ../frontend-project
npm install
```

4. Configure environment variables
Create a `.env` file in the backend directory with:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=crpms
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
```

5. Start the application
```bash
# Backend
cd backend-project
npm run dev

# Frontend
cd ../frontend-project
npm start
```

## API Endpoints

### Authentication

#### Register
- Method: POST
- URL: `http://localhost:5000/api/auth/register`
- Body:
  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```

#### Login
- Method: POST
- URL: `http://localhost:5000/api/auth/login`
- Body:
  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```

### Car Management

#### Get All Cars
- Method: GET
- URL: `http://localhost:5000/api/cars`
- Headers: Include Authorization token

#### Create Car
- Method: POST
- URL: `http://localhost:5000/api/cars`
- Headers: Include Authorization token
- Body:
  ```json
  {
    "plateNumber": "ABC123",
    "brand": "Toyota",
    "model": "Camry",
    "year": 2020,
    "color": "Silver",
    "ownerName": "John Doe",
    "ownerPhone": "1234567890"
  }
  ```

### Service Management

#### Get All Services
- Method: GET
- URL: `http://localhost:5000/api/services`
- Headers: Include Authorization token

#### Create Service
- Method: POST
- URL: `http://localhost:5000/api/services`
- Headers: Include Authorization token
- Body:
  ```json
  {
    "serviceName": "Oil Change",
    "description": "Regular oil change service",
    "price": 50.00
  }
  ```

### Service Records

#### Get All Service Records
- Method: GET
- URL: `http://localhost:5000/api/service-records`
- Headers: Include Authorization token

#### Create Service Record
- Method: POST
- URL: `http://localhost:5000/api/service-records`
- Headers: Include Authorization token
- Body:
  ```json
  {
    "carId": 1,
    "serviceId": 1,
    "date": "2024-03-20",
    "status": "pending",
    "notes": "Regular maintenance"
  }
  ```

### Payments

#### Get All Payments
- Method: GET
- URL: `http://localhost:5000/api/payments`
- Headers: Include Authorization token

#### Create Payment
- Method: POST
- URL: `http://localhost:5000/api/payments`
- Headers: Include Authorization token
- Body:
  ```json
  {
    "serviceRecordId": 1,
    "amount": 50.00,
    "paymentMethod": "cash",
    "paymentDate": "2024-03-20"
  }
  ```

### Reports

#### Get Daily Report
- Method: GET
- URL: `http://localhost:5000/api/reports/daily`
- Headers: Include Authorization token
- Query Parameters:
  - date: YYYY-MM-DD (optional)

## Frontend Routes

- `/` - Dashboard
- `/cars` - Car Management
- `/services` - Service Management
- `/service-records` - Service Records
- `/payments` - Payment Management
- `/reports` - Daily Reports

## Development

### Backend Structure
```
backend-project/
├── config/
│   └── database.js
├── controllers/
│   ├── authController.js
│   ├── carController.js
│   ├── serviceController.js
│   ├── serviceRecordController.js
│   ├── paymentController.js
│   └── reportController.js
├── middleware/
│   └── auth.js
├── models/
│   ├── Car.js
│   ├── Service.js
│   ├── ServiceRecord.js
│   └── Payment.js
├── routes/
│   ├── auth.js
│   ├── cars.js
│   ├── services.js
│   ├── serviceRecords.js
│   ├── payments.js
│   └── reports.js
└── server.js
```

### Frontend Structure
```
frontend-project/
├── src/
│   ├── components/
│   │   ├── Navigation.js
│   │   ├── CarForm.js
│   │   ├── ServiceForm.js
│   │   ├── ServiceRecordForm.js
│   │   └── PaymentForm.js
│   ├── pages/
│   │   ├── Dashboard.js
│   │   ├── Cars.js
│   │   ├── Services.js
│   │   ├── ServiceRecords.js
│   │   ├── Payments.js
│   │   └── Reports.js
│   ├── services/
│   │   └── api.js
│   └── App.js
└── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 