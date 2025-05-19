# Employee Payroll Management System (EPMS)

A web-based application for managing employee payroll and department information.

## Features

- Employee Management
- Department Management
- Salary Management
- Monthly Payroll Reports
- User Authentication

## Tech Stack

- Frontend: React.js with Tailwind CSS
- Backend: Node.js with Express.js
- Database: MySQL
- Authentication: JWT

## Setup Instructions

1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. Configure environment variables
Create a `.env` file in the backend directory with:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=epms
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
```

4. Start the application
```bash
# Backend
cd backend
npm run dev

# Frontend
cd ../frontend
npm start
```

## API Endpoints

### Authentication
- POST `/api/auth/login` - User login
- POST `/api/auth/register` - User registration

### Employees
- GET `/api/employees` - Get all employees
- GET `/api/employees/:id` - Get employee by ID
- POST `/api/employees` - Create new employee
- PUT `/api/employees/:id` - Update employee
- DELETE `/api/employees/:id` - Delete employee

### Departments
- GET `/api/departments` - Get all departments
- GET `/api/departments/:id` - Get department by ID
- POST `/api/departments` - Create new department
- PUT `/api/departments/:id` - Update department
- DELETE `/api/departments/:id` - Delete department

### Salaries
- GET `/api/salaries` - Get all salaries
- GET `/api/salaries/employee/:employeeId` - Get salaries by employee
- POST `/api/salaries` - Create new salary record
- PUT `/api/salaries/:id` - Update salary record
- DELETE `/api/salaries/:id` - Delete salary record

### Reports
- GET `/api/reports/monthly` - Get monthly payroll report 