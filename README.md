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
cd backend-project
npm install

# Frontend
cd ../frontend-frontend
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

## API Testing with Postman

### 1. Non-Protected Routes (Authentication)

#### Register a New User
- Method: POST
- URL: `http://localhost:5000/api/auth/register`
- Headers: 
  ```
  Content-Type: application/json
  ```
- Body (raw JSON):
  ```json
  {
      "username": "your_username",
      "password": "your_password"
  }
  ```

#### Login
- Method: POST
- URL: `http://localhost:5000/api/auth/login`
- Headers: 
  ```
  Content-Type: application/json
  ```
- Body (raw JSON):
  ```json
  {
      "username": "your_username",
      "password": "your_password"
  }
  ```
- Response will include a JWT token:
  ```json
  {
      "token": "eyJhbGciOiJIUzI1NiIs..."
  }
  ```

### 2. Protected Routes

For all protected routes, you need to include the JWT token in the request header:
```
Authorization: Bearer your_token_here
```
example in header
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...  (your token here)

#### Employee Management

1. Get All Employees
- Method: GET
- URL: `http://localhost:5000/api/employees`
- Headers: Include Authorization token

2. Create Employee
- Method: POST
- URL: `http://localhost:5000/api/employees`
- Headers: Include Authorization token
- Body (raw JSON):
  ```json
  {
      "firstName": "John",
      "lastName": "Doe",
      "address": "123 Main St",
      "position": "Developer",
      "telephone": "1234567890",
      "gender": "Male",
      "hiredDate": "2024-03-20",
      "departmentCode": 1
  }
  ```

#### Department Management

1. Get All Departments
- Method: GET
- URL: `http://localhost:5000/api/departments`
- Headers: Include Authorization token

2. Create Department
- Method: POST
- URL: `http://localhost:5000/api/departments`
- Headers: Include Authorization token
- Body (raw JSON):
  ```json
  {
      "departmentName": "IT Department"
  }
  ```

#### Salary Management

1. Get All Salaries
- Method: GET
- URL: `http://localhost:5000/api/salaries`
- Headers: Include Authorization token

2. Create Salary Record
- Method: POST
- URL: `http://localhost:5000/api/salaries`
- Headers: Include Authorization token
- Body (raw JSON):
  ```json
  {
      "employeeNumber": 1,
      "grossSalary": 5000,
      "totalDeduction": 500,
      "netSalary": 4500,
      "month": "2024-03"
  }
  ```

#### Reports

1. Get Monthly Report
- Method: GET
- URL: `http://localhost:5000/api/reports/monthly`
- Headers: Include Authorization token

### Testing Tips

1. **Setting Up Authorization Headers in Postman**:
   
   a. **Manual Method**:
   - After login, copy the JWT token from the response
   - In your request, go to the "Headers" tab
   - Add a new header:
     ```
     Key: Authorization
     Value: Bearer eyJhbGciOiJIUzI1NiIs... (your token here)
     ```

   b. **Using Postman Environment Variables (Recommended)**:
   1. Click on "Environments" in Postman
   2. Create a new environment (e.g., "EPMS Local")
   3. Add these variables:
      ```
      baseUrl: http://localhost:5000
      token: (leave empty for now)
      ```
   4. After login, use this script in the "Tests" tab to automatically save the token:
      ```javascript
      if (pm.response.code === 200) {
          var jsonData = pm.response.json();
          pm.environment.set("token", jsonData.token);
      }
      ```
   5. In your requests, use the token variable:
      ```
      Key: Authorization
      Value: Bearer {{token}}
      ```

   c. **Using Postman Authorization**:
   1. Go to the "Authorization" tab in your request
   2. Select "Bearer Token" from the Type dropdown
   3. Enter your token in the "Token" field
   4. Or use the variable: {{token}}

2. **Token Management**:
   - After login, copy the token from the response
   - In Postman, you can create an environment variable to store the token
   - Use the variable in your Authorization header: `Bearer {{token}}`

3. **Error Handling**:
   - 401 Unauthorized: Missing or invalid token
   - 403 Forbidden: Valid token but insufficient permissions
   - 404 Not Found: Resource doesn't exist
   - 400 Bad Request: Invalid input data

4. **Postman Collection**:
   - Create a collection for all EPMS endpoints
   - Use environment variables for base URL and token
   - Group requests by feature (Auth, Employees, Departments, etc.)

5. **Testing Sequence**:
   1. Register a new user
   2. Login to get the token
   3. Use the token to access protected routes
   4. Test CRUD operations for each resource
   5. Verify the monthly report

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