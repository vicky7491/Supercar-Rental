# API Documentation

## Overview
This document provides detailed information about the API endpoints for the Supercar Rental application. It includes descriptions, request/response formats, and possible error responses for each endpoint.

---

## **User Routes**

### **1. Register a User**

#### **Description**
Allows a new user to register an account by providing their details. A token is returned upon successful registration for authentication.

#### **HTTP Method**
`POST`

#### **Endpoint**
`/users/register`

#### **Request Body**
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

**Example Request:**
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

#### **Possible Responses**
- **201 Created**: User registered successfully. Returns a token and user details.
- **400 Bad Request**: Validation failed or missing/invalid data.
- **409 Conflict**: Email already exists.

---

### **2. Login a User**

#### **Description**
Allows a registered user to log in by providing their email and password. A JWT token is returned upon successful login.

#### **HTTP Method**
`POST`

#### **Endpoint**
`/users/login`

#### **Request Body**
```json
{
  "email": "Valid email format",
  "password": "string (min 6 chars)"
}
```

**Example Request:**
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

#### **Possible Responses**
- **200 OK**: User authenticated successfully. Returns a token and user details.
- **400 Bad Request**: Validation failed or missing/invalid data.
- **401 Unauthorized**: Invalid email or password.

---

### **3. Get User Profile**

#### **Description**
Retrieves the profile information of an authenticated user.

#### **HTTP Method**
`GET`

#### **Endpoint**
`/users/profile`

#### **Authentication**
Requires a valid JWT token provided as:
- A cookie named `token`, or
- In the `Authorization` header: `Bearer <token>`

#### **Possible Responses**
- **200 OK**: Successfully retrieved user profile.
- **401 Unauthorized**: Missing or invalid token.
- **403 Forbidden**: Token blacklisted (user logged out).

---

### **4. Logout a User**

#### **Description**
Logs out an authenticated user by invalidating their current JWT token.

#### **HTTP Method**
`GET`

#### **Endpoint**
`/users/logout`

#### **Authentication**
Requires a valid JWT token provided as:
- A cookie named `token`, or
- In the `Authorization` header: `Bearer <token>`

#### **Possible Responses**
- **200 OK**: Successfully logged out.
- **401 Unauthorized**: Missing or invalid token.

---

## **Vehicle Routes**

### **1. Create a Vehicle**

#### **Description**
Allows a user to create a new vehicle listing.

#### **HTTP Method**
`POST`

#### **Endpoint**
`/vehicles`

#### **Request Body**
```json
{
  "vehicleType": "string (supercar, car, superbike, bike)",
  "brand": "string",
  "model": "string",
  "hourlyRate": "number (minimum 100)",
  "color": "string (min 3 characters)",
  "plate": "string (e.g., MH02AB1234)",
  "capacity": "number (minimum 1)",
  "features": {
    "insuranceValid": "boolean",
    "transmission": "string (manual or automatic)"
  }
}
```

**Example Request:**
```json
{
  "vehicleType": "supercar",
  "brand": "Ferrari",
  "model": "488 Spider",
  "hourlyRate": 5000,
  "color": "Red",
  "plate": "MH02AB1234",
  "capacity": 2,
  "features": {
    "insuranceValid": true,
    "transmission": "automatic"
  }
}
```

#### **Possible Responses**
- **201 Created**: Vehicle created successfully.
- **400 Bad Request**: Validation failed or missing/invalid data.
- **500 Internal Server Error**: Server error while creating the vehicle.

---

### **2. Get All Vehicles**

#### **Description**
Retrieves a list of all vehicles.

#### **HTTP Method**
`GET`

#### **Endpoint**
`/vehicles`

#### **Possible Responses**
- **200 OK**: Successfully retrieved vehicles.
- **500 Internal Server Error**: Server error while fetching vehicles.

---

### **3. Get Vehicle by ID**

#### **Description**
Retrieves a specific vehicle by its ID.

#### **HTTP Method**
`GET`

#### **Endpoint**
`/vehicles/:id`

#### **Possible Responses**
- **200 OK**: Successfully retrieved the vehicle.
- **404 Not Found**: Vehicle not found.
- **500 Internal Server Error**: Server error while fetching the vehicle.

---

### **4. Update Vehicle**

#### **Description**
Allows a user to update an existing vehicle.

#### **HTTP Method**
`PUT`

#### **Endpoint**
`/vehicles/:id`

#### **Request Body**
Include only the fields to be updated.

**Example Request:**
```json
{
  "color": "Blue",
  "hourlyRate": 6000
}
```

#### **Possible Responses**
- **200 OK**: Vehicle updated successfully.
- **404 Not Found**: Vehicle not found or unauthorized.
- **500 Internal Server Error**: Server error while updating the vehicle.

---

### **5. Delete Vehicle**

#### **Description**
Allows a user to delete an existing vehicle.

#### **HTTP Method**
`DELETE`

#### **Endpoint**
`/vehicles/:id`

#### **Possible Responses**
- **200 OK**: Vehicle deleted successfully.
- **404 Not Found**: Vehicle not found or unauthorized.
- **500 Internal Server Error**: Server error while deleting the vehicle.

---

## **Notes**
- All sensitive data, such as passwords, are securely hashed.
- JWT tokens expire after 1 hour and are blacklisted upon logout.
- Ensure proper validation for all input fields to avoid errors.
- Blacklisted tokens are automatically removed after 24 hours using a TTL index in the database.
- Use appropriate HTTP status codes for all responses to ensure clarity.



---

## **Booking Routes**

### **1. Create a Booking**

#### **Description**
Allows a user to create a new booking for a vehicle. The booking ensures that the vehicle is reserved for the specified time period.

#### **HTTP Method**
`POST`

#### **Endpoint**
`/bookings`

#### **Request Body**
```json
{
  "vehicleId": "string (valid MongoDB ObjectId)",
  "startTime": "ISO8601 date format (e.g., 2025-03-28T10:00:00Z)",
  "endTime": "ISO8601 date format (e.g., 2025-03-28T14:00:00Z)"
}


Example Request: 

{
  "vehicleId": "6123456789abcdef01234567",
  "startTime": "2025-03-28T10:00:00Z",
  "endTime": "2025-03-28T14:00:00Z"
}

 
 Example resopnse:

 Status Code: 201 Created

 {
  "_id": "6123456789abcdef01234568",
  "user": "6123456789abcdef01234567",
  "vehicle": "6123456789abcdef01234567",
  "startTime": "2025-03-28T10:00:00Z",
  "endTime": "2025-03-28T14:00:00Z",
  "totalPrice": 2000,
  "status": "pending",
  "createdAt": "2025-03-27T10:00:00.000Z",
  "updatedAt": "2025-03-27T10:00:00.000Z"
}


Possible Responses
201 Created: Booking created successfully.
400 Bad Request: Validation failed or overlapping booking exists

{
  "message": "Vehicle is already booked for this time slot"
}

404 Not Found: Vehicle not found

{
  "message": "Vehicle not found"
}


500 Internal Server Error: Server error while creating the booking.

### **2. Get All Bookings**

#### **Description**
Retrieves a list of all bookings made by the authenticated user.

#### **HTTP Method**
`GET`

#### **Endpoint**
`/bookings`

#### **Authentication**
Requires a valid JWT token provided as:
- A cookie named `token`, or
- In the `Authorization` header: `Bearer <token>`

#### **Possible Responses**
- **200 OK**: Successfully retrieved bookings.
  ```json
  [
    {
      "_id": "6123456789abcdef01234568",
      "user": "6123456789abcdef01234567",
      "vehicle": {
        "_id": "6123456789abcdef01234567",
        "brand": "Ferrari",
        "model": "488 Spider",
        "hourlyRate": 5000
      },
      "startTime": "2025-03-28T10:00:00Z",
      "endTime": "2025-03-28T14:00:00Z",
      "totalPrice": 2000,
      "status": "pending",
      "createdAt": "2025-03-27T10:00:00.000Z",
      "updatedAt": "2025-03-27T10:00:00.000Z"
    }
  ]
  ```
- **401 Unauthorized**: Missing or invalid token.
- **500 Internal Server Error**: Server error while fetching bookings.



### **3. Get User's Bookings**

#### **Description**
Retrieves all bookings made by a specific user. This endpoint is accessible only by admins.

#### **HTTP Method**
`GET`

#### **Endpoint**
`/bookings/user/:userId`

#### **Authentication**
Requires a valid JWT token with admin privileges provided as:
- A cookie named `token`, or
- In the `Authorization` header: `Bearer <token>`

#### **Possible Responses**
- **200 OK**: Successfully retrieved user's bookings.
  ```json
  [
    {
      "_id": "6123456789abcdef01234568",
      "user": "6123456789abcdef01234567",
      "vehicle": {
        "_id": "6123456789abcdef01234567",
        "brand": "Ferrari",
        "model": "488 Spider",
        "hourlyRate": 5000
      },
      "startTime": "2025-03-28T10:00:00Z",
      "endTime": "2025-03-28T14:00:00Z",
      "totalPrice": 2000,
      "status": "pending",
      "createdAt": "2025-03-27T10:00:00.000Z",
      "updatedAt": "2025-03-27T10:00:00.000Z"
    }
  ]
  ```
- **401 Unauthorized**: Missing or invalid token.
- **403 Forbidden**: Insufficient privileges to access this resource.
- **404 Not Found**: User not found.
- **500 Internal Server Error**: Server error while fetching user's bookings.


### **4. Cancel a Booking**

#### **Description**
Allows a user to cancel an existing booking. The booking status is updated to "canceled."

#### **HTTP Method**
`DELETE`

#### **Endpoint**
`/bookings/:id`

#### **Authentication**
Requires a valid JWT token provided as:
- A cookie named `token`, or
- In the `Authorization` header: `Bearer <token>`

#### **Possible Responses**
- **200 OK**: Booking canceled successfully.
  ```json
  {
    "message": "Booking canceled successfully"
  }
  ```
- **400 Bad Request**: Booking cannot be canceled (e.g., already started or completed).
  ```json
  {
    "message": "Booking cannot be canceled at this stage"
  }
  ```
- **404 Not Found**: Booking not found.
  ```json
  {
    "message": "Booking not found"
  }
  ```
- **401 Unauthorized**: Missing or invalid token.
- **500 Internal Server Error**: Server error while canceling the booking.