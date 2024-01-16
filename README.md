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


## Usage

### Base Link: https://rbac-project.onrender.com/root/api/v1/

1. Signup a Create User
    ```bash
      POST /signup
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "Admin@123",
  "role": "admin"
}
   ```
   




   
