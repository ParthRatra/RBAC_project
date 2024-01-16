# RBAC Authentication API

RBAC Authentication API is a Node.js/Express application with Role-Based Access Control (RBAC) for user authentication and authorization.

## Features

- User signup, login, and authentication using JSON Web Tokens (JWT)
- Role-based access control (RBAC) with different access levels: admin, manager, and employee
- CRUD operations for user management
- Password hashing for security
- Dashboard, settings, and statistics modules with access restrictions
- Reset password functionality with token generation

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/rbac-authentication-api.git
   cd rbac-authentication-api
   ```

2.Install dependecies
   ```bash
   npm install
   ```

3.Run the application:
   ```bash
   npm run dev
   ```


## Features
- User signup with password hashing and validation.
- User login with JWT authentication.
- User roles: admin, manager, employee.
- Protected routes based on their roles like Admin,Employee,Manger can acess the Dashboad, Admin and Manager can access the Statistics , only Amdin can access the Settings.
- Admin can view all users.
- Admin can update user roles.
- Admin and Manager can update user names.
- Admin can delete users.
- Password reset functionality with token generation.

## Usage

### Base Link: https://rbac-project.onrender.com/root/api/v1/


### postman link :  https://gold-rocket-608863.postman.co/workspace/My-Workspace~54a9ecd8-6df2-496d-8f41-76129fe2d78d/request/21113855-eaa29ae4-5931-4c27-8b9c-3611e5a18bbe

1. Signup - Create a user

```
1.POST /signup

{
  "name": "Admin User", "Manager User1" , "Manager User2" , "Employee User1", "Employee User2"
  "email": "admin@example.com", "manager1@example.com" ,"manager2@example.com" , "employee1@example.com" , "employee2@example.com"
  "password": "Admin@123", "Manager@123" , "Manager@456" , "Employee@123" , "Employee@456"
  "role": "admin", "manager" , "manager" , "employee" , "employee"
}
```


2. Login - Get an authentication token

```
POST /login

{
  "email": "admin@example.com",
  "password": "Admin@123"
}
```
Use the token received in the response for subsequent requests.



## Authentication and Authorization

- JWT is used for authentication.
- Middleware functions (auth, isAdmin, isManager, isEmployee) control access based on user roles.
- Protected routes are defined with the required middleware.


## Environment Variables

- NODE_ENV: Development or production environment.
- PORT: Port on which the server runs.
- MONGODB_URI: MongoDB connection string.
- JWT_SECRET_KEY: Secret key for JWT token generation.









   




   
