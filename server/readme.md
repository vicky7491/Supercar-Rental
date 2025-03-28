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


---

## **Email Confirmation**

### **Description**
The application uses Nodemailer to send email confirmations for bookings. When a user successfully creates a booking, they receive an email with the booking details, including the vehicle information, start and end times, and the total price.

---

### **Email Service Configuration**

The email service is configured using the `nodemailer` library. The application uses environment variables to securely store email credentials.

#### **Configuration File**
The email configuration is located in `server/config/nodemailer.js`:

```javascript
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email provider (e.g., Gmail, SMTP)
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // App password or email password
  },
});

export default transporter;


Environment Variables
The following environment variables must be set in the .env file:

EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password

Email Sending Process
When a booking is successfully created, an email is sent to the user with the booking details. The email includes:

Vehicle information (brand and model)
Booking start and end times
Total price
A link to view the booking


Example Email Sending Code
The email is sent using the transporter.sendMail() method in the createBooking function:

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: req.user.email,
  subject: "Booking Confirmation - Supercar Rental",
  html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; background: #f9f9f9;">
      <h2 style="color: #27ae60; text-align: center;">Booking Confirmed ✅</h2>
      <p>Dear <strong>${req.user.firstname}</strong>,</p>
      <p>Your booking for <strong style="color: #e67e22;">${vehicle.brand} ${vehicle.model}</strong> has been successfully confirmed!</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Start Time:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${new Date(startTime).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>End Time:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${new Date(endTime).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Total Price:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong style="color: #2c3e50;">₹${totalPrice.toLocaleString("en-IN")}</strong></td>
        </tr>
      </table>
      <p style="margin-top: 20px;">We appreciate your trust in <strong>Supercar Rental</strong>. Enjoy your ride! 🚗💨</p>
      <div style="text-align: center; margin-top: 20px;">
        <a href="https://supercarrental.com/bookings/${booking._id}" 
           style="display: inline-block; padding: 12px 24px; background: #3498db; color: white; text-decoration: none; font-size: 16px; border-radius: 5px;">
          View Your Booking
        </a>
      </div>
      <p style="margin-top: 20px; font-size: 14px; color: #555;">If you have any questions, feel free to contact us.</p>
    </div>
  `,
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.error("Email failed to send:", err);
  } else {
    console.log("Booking confirmation email sent:", info.response);
  }
});


Example Request
When a user creates a booking, the email is automatically sent. Here's an example request to create a booking:

Request:

{
  "vehicleId": "6123456789abcdef01234567",
  "startTime": "2025-03-28T10:00:00Z",
  "endTime": "2025-03-28T14:00:00Z"
}

Example Response
If the email is sent successfully, the booking is created, and the response includes the booking details:

Response: Status Code: 201 Created

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

Possible Errors
500 Internal Server Error: If the email fails to send, the booking is still created, but the error is logged.

{
  "message": "Booking created, but email failed to send"
}

Ensure that the EMAIL_USER and EMAIL_PASS(App password) environment variables are correctly set.
Use app-specific passwords for Gmail or other providers to avoid authentication issues.
The email template can be customized to include additional details or branding.
Emails are sent asynchronously, so the booking process is not delayed.