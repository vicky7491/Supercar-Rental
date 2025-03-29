# Client Documentation

## **Authentication Pages**

### **1. Signup Page**

#### **Description**
The Signup page allows new users to create an account by providing their details such as first name, last name, email, password, and role. If the user selects the "Seller" role, they are also required to provide their Aadhar card number.

---

#### **Route**
`/signup`

---

#### **Form Fields**
- **First Name**: Text input (required, minimum 3 characters).
- **Last Name**: Text input (required, minimum 3 characters).
- **Email**: Email input (required, must be a valid email format).
- **Password**: Password input (required, minimum 6 characters).
- **Role**: Radio buttons to select either "Renter" or "Seller".
- **Aadhar Card**: Text input (required only if the role is "Seller", must be 12 digits).

---

#### **Example Request**
When the user submits the form, the following request is sent to the backend:

**POST Request to `/users/register`:**
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


if the role is "seller":
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane.smith@example.com",
  "password": "securepassword",
  "role": "seller",
  "aadharCard": "123456789012"
}

Example Response
Status Code: 201 Created
{
  "message": "Signup successful! Please login."
}

### **2. Login Page**

#### **Description**
The Login page allows existing users to access their accounts by providing their email and password.

---

#### **Route**
`/login`

---

#### **Form Fields**
- **Email**: Email input (required, must be a valid email format).
- **Password**: Password input (required, minimum 6 characters).

---

#### **Example Request**
When the user submits the form, the following request is sent to the backend:

**POST Request to `/users/login`:**
```json
{
    "email": "john.doe@example.com",
    "password": "securepassword"
}
```

---

#### **Example Response**
**Status Code: 200 OK**
```json
{
    "message": "Login successful!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Status Code: 401 Unauthorized**
```json
{
    "message": "Invalid email or password."
}
```