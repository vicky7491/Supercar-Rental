# /users/register

### Description
This endpoint allows a new user to register an account by providing their details such as name, email, password, and role. The user will receive a token upon successful registration, which can be used for authentication in subsequent requests.

---

### HTTP Method
**POST**

---

### Endpoint
`POST /users/register`

---

### Request Body
The request body should be in JSON format and include the following fields:

```json
{
  "fullname": {
    "firstname": "string (min 3 chars)",
    "lastname": "string (min 3 chars)"
  },
  "email": "Valid email format",
  "password": "string (min 5 chars)",
  "role": "Either 'seller' or 'renter'"
}
```

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword",
  "role": "renter"
}
```

Field Descriptions:
fullname.firstname: The first name of the user. Must be a string with a minimum length of 3 characters.
fullname.lastname: The last name of the user. Must be a string with a minimum length of 3 characters.
email: The email address of the user. Must be a valid email format and unique.
password: The password for the user account. Must be a string with a minimum length of 5 characters.
role: The role of the user. Must be either "seller" or "renter".


Example Request

{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword",
  "role": "renter"
}



---

### Possible Responses

#### Success
- **201 Created**: The user was successfully registered. Returns a token and user details.

#### Errors
- **400 Bad Request**: Validation failed or missing/invalid data.
  ```json
  {
    "errors": [
      {
        "msg": "First name must be at least 3 characters long",
        "param": "fullname.firstname",
        "location": "body"
      }
    ]
  }


409 Conflict: Email already exists.

{
  "error": "Email already exists"
}

Notes
Ensure the email field is unique for each user.
Passwords are hashed before being stored in the database.
The token is a JSON Web Token (JWT) that expires in 1 hour




# /users/login

### Description
This endpoint allows a registered user to log in by providing their email and password. Upon a successful login, a JSON Web Token (JWT) is generated, which can be used for subsequent authenticated requests.

---

### HTTP Method
**POST**

---

### Endpoint
`POST /users/login`

---

### Request Body
The request body should be in JSON format and include the following fields:

```json
{
  "email": "Valid email format",
  "password": "string (min 6 chars)"
}

Field Descriptions:
email: The registered email address of the user. Must be in a valid email format.
password: The password for the user account. Must be a string with a minimum length of 6 characters.


Example Request:

{
  "email": "john.doe@example.com",
  "password": "securepassword"
}

Example Response
Status Code: 200 OK

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "string",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com",
    "role": "renter",
    "createdAt": "2025-03-26T10:00:00.000Z",
    "updatedAt": "2025-03-26T10:00:00.000Z"
  }
}

Possible Responses
Success
200 OK: The user was successfully authenticated. Returns a token and user details.
Errors
400 Bad Request: Validation failed or missing/invalid data

{
  "errors": [
    {
      "msg": "Please enter a valid email",
      "param": "email",
      "location": "body"
    }
  ]
}

401 Unauthorized: Invalid email or password

{
  "message": "Invalid email or password"
}

Notes
Ensure the user’s credentials are correct.
Passwords are hashed in the database, so direct comparison is not possible; the system uses bcrypt for validation.
If successful, the returning token is a JWT with a 1-hour expiration. 



# API Documentation

---

## /users/profile

### Description
This endpoint allows an authenticated user to retrieve their profile information. The request must include a valid JWT token for authentication.

---

### HTTP Method
**GET**

---

### Endpoint
`GET /users/profile`

---

### Authentication
This endpoint requires authentication. The JWT token must be provided in one of the following ways:
- As a cookie named `token`
- In the `Authorization` header: `Authorization: Bearer <token>`

---

### Request
No request body is required for this endpoint.

---

### Example Response
**Status Code: 200 OK**
```json
{
  "_id": "6123456789abcdef01234567",
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "role": "renter",
  "createdAt": "2025-03-26T10:00:00.000Z",
  "updatedAt": "2025-03-26T10:00:00.000Z"
}



Possible Responses
Success
200 OK: Successfully retrieved user profile.
Errors
401 Unauthorized: Missing or invalid token

{
  "message": "Not authorized, token failed"
}


403 Forbidden: Token exists in the blacklist (user logged out).

{
  "message": "Not authorized, token is blacklisted"
}

Notes
This endpoint returns the authenticated user's profile data.
Sensitive information like passwords is not included in the response



/users/logout
Description
This endpoint allows an authenticated user to log out by invalidating their current JWT token. The token is added to a blacklist to prevent reuse.

HTTP Method
GET

Endpoint
GET /users/logout

Authentication
This endpoint requires authentication. The JWT token must be provided in one of the following ways:

As a cookie named token
In the Authorization header: Authorization: Bearer <token>
Request
No request body is required for this endpoint.

Example Response
Status Code: 200 OK

{
  "message": "Logged out successfully"
}

Possible Responses
Success
200 OK: Successfully logged out.
Errors
401 Unauthorized: Missing or invalid token.

{
  "message": "Not authorized, token failed"
}

Notes
This endpoint clears the token cookie if it exists.
The JWT token is added to a blacklist in the database to prevent its reuse.
Blacklisted tokens automatically expire after 24 hours using a TTL index in the database.
After logout, any subsequent requests using the same token will be rejected.