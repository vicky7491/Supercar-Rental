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