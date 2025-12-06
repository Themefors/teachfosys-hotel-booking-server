# TeachFosys Hotel Booking System - API Documentation

## Overview

This is a comprehensive API documentation for the TeachFosys Hotel Booking System backend. The API is built using Node.js, Express, TypeScript, and MongoDB with Zod for validation.

**Base URL**: `http://localhost:5000/api/v1`

**Authentication**: JWT Bearer Token (Cookie-based)

**Content-Type**: `application/json`

---

## Response Format

All API responses follow this standard format:

```typescript
{
  statusCode: number,
  success: boolean,
  message?: string,
  meta?: {
    page: number,
    limit: number,
    total: number
  },
  data?: T | null
}
```

---

## Authentication Endpoints

### 1. User Signup

**POST** `/auth/signup`

Register a new user account.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "01712345678",
  "gender": "male",
  "address": "123 Main St, City",
  "role": "user",
  "dob": "1990-01-15"
}
```

**Validation Rules:**

- `name`: Required, 2-100 characters
- `email`: Required, valid email format
- `password`: Required, 6-50 characters
- `phone`: Optional, 10-15 digits
- `gender`: Optional, enum: `male`, `female`, `others`
- `address`: Optional, max 255 characters
- `role`: Optional, enum: `admin`, `manager`, `stuff`, `accounts`, `user`
- `dob`: Optional, ISO date format

**Response:**

```json
{
  "statusCode": 201,
  "success": true,
  "message": "User created successfully",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

---

### 2. Send OTP

**POST** `/auth/signup/send-otp`

Send OTP to user's email for verification.

**Request Body:**

```json
{
  "email": "john@example.com"
}
```

---

### 3. Verify OTP

**POST** `/auth/signup/verify-otp`

Verify OTP sent to user's email.

**Request Body:**

```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

---

### 4. User Login

**POST** `/auth/login`

Authenticate user and receive access token.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation Rules:**

- `email`: Required, valid email format
- `password`: Required, non-empty

**Response:**

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "jwt_token_here",
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

---

### 5. Edit User Profile

**PATCH** `/auth/login/edit-me`

Update authenticated user's profile.

**Authentication Required**: Yes (USER, ADMIN)

**Request Body:**

```json
{
  "dob": "1990-01-15",
  "phone": "01712345678",
  "gender": "male",
  "address": "123 Main St, City",
  "picture": "https://example.com/profile.jpg"
}
```

---

### 6. User Logout

**POST** `/auth/logout`

Logout user and clear authentication cookies.

**Authentication Required**: Yes

---

## User Management Endpoints

### 1. Create User

**POST** `/users/create`

Create a new user (Admin function).

**Request Body:**

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "password123",
  "dob": "1992-05-20",
  "phone": "01898765432",
  "gender": "female",
  "address": "456 Oak Ave, Town",
  "picture": "https://example.com/jane.jpg",
  "status": "active",
  "booking_id": "booking_123",
  "role": "manager"
}
```

**Validation Rules:**

- `name`: Required, non-empty
- `email`: Required, valid email format
- `password`: Required, min 6 characters
- `phone`: Optional, BD phone format (017XXXXXXXX or +88017XXXXXXXX)
- `picture`: Optional, valid URL
- `status`: Optional, enum: `pending`, `active`, `suspended`, `deleted`
- `role`: Optional, enum: `admin`, `manager`, `stuff`, `accounts`, `user`

---

### 2. Get All Users

**GET** `/users`

Retrieve list of all users.

**Response:**

```json
{
  "statusCode": 200,
  "success": true,
  "data": {
    "users": [
      {
        "id": "user_id",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "user",
        "status": "active"
      }
    ]
  }
}
```

---

## Room Management Endpoints

### 1. Get All Rooms

**GET** `/rooms`

Retrieve list of all available rooms.

**Response:**

```json
{
  "statusCode": 200,
  "success": true,
  "data": {
    "rooms": [
      {
        "id": "room_id",
        "name": "Deluxe Suite",
        "type": "suite",
        "price": 150,
        "capacity": 2,
        "available": true
      }
    ]
  }
}
```

---

### 2. Get Room by ID

**GET** `/rooms/:roomId`

Retrieve specific room details.

**Path Parameters:**

- `roomId`: Room ID (string)

---

### 3. Create Room

**POST** `/rooms`

Create a new room.

**Authentication Required**: Yes (ADMIN, MANAGER)

**Request Body:**

```json
{
  "name": "Standard Room",
  "type": "standard",
  "price": 80,
  "capacity": 2,
  "description": "Comfortable standard room with amenities",
  "amenities": ["WiFi", "TV", "AC"],
  "images": ["https://example.com/room1.jpg"]
}
```

---

### 4. Update Room

**PATCH** `/rooms/:roomId`

Update room details.

**Authentication Required**: Yes (ADMIN, MANAGER)

**Path Parameters:**

- `roomId`: Room ID (string)

**Request Body:**

```json
{
  "name": "Updated Room Name",
  "price": 90,
  "available": false
}
```

---

### 5. Delete Room

**DELETE** `/rooms/:roomId`

Delete a room.

**Authentication Required**: Yes (ADMIN)

**Path Parameters:**

- `roomId`: Room ID (string)

---

## Banner Management Endpoints

### 1. Create Banner

**POST** `/banners`

Create a new banner for the homepage.

**Request Body:**

```json
{
  "picture": "https://example.com/banner.jpg",
  "title": "Welcome to Our Hotel",
  "subtitle": "Experience luxury and comfort"
}
```

**Validation Rules:**

- `picture`: Required, valid URL
- `title`: Required, non-empty
- `subtitle`: Required, non-empty

---

### 2. Get All Banners

**GET** `/banners`

Retrieve all active banners.

---

### 3. Get Banner by ID

**GET** `/banners/:id`

Retrieve specific banner details.

---

### 4. Update Banner

**PATCH** `/banners/:id`

Update banner details.

**Request Body:**

```json
{
  "title": "Updated Banner Title",
  "subtitle": "Updated subtitle"
}
```

---

### 5. Delete Banner

**DELETE** `/banners/:id`

Delete a banner.

---

## Blog Management Endpoints

### 1. Create Blog

**POST** `/blogs`

Create a new blog post.

**Request Body:**

```json
{
  "image": "https://example.com/blog.jpg",
  "title": "Top 10 Travel Tips",
  "content": "Here are the best travel tips for your next adventure...",
  "category": "travel"
}
```

**Validation Rules:**

- `image`: Required, valid URL
- `title`: Required, non-empty
- `content`: Required, non-empty
- `category`: Required, non-empty

---

### 2. Get All Blogs

**GET** `/blogs`

Retrieve all blog posts.

---

### 3. Get Blogs by Category

**GET** `/blogs/category/:category`

Retrieve blog posts by category.

**Path Parameters:**

- `category`: Blog category (string)

---

### 4. Get Blog by ID

**GET** `/blogs/:id`

Retrieve specific blog post.

---

### 5. Update Blog

**PATCH** `/blogs/:id`

Update blog post details.

**Request Body:**

```json
{
  "title": "Updated Blog Title",
  "content": "Updated blog content..."
}
```

---

### 6. Delete Blog

**DELETE** `/blogs/:id`

Delete a blog post.

---

## Contact Management Endpoints

### 1. Create Contact

**POST** `/contact`

Submit a contact form.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "01712345678",
  "message": "I would like to inquire about room availability"
}
```

---

### 2. Get All Contacts

**GET** `/contact`

Retrieve all contact submissions.

---

### 3. Get Contact by ID

**GET** `/contact/:id`

Retrieve specific contact submission.

---

### 4. Update Contact

**PATCH** `/contact/:id`

Update contact submission status or details.

---

### 5. Delete Contact

**DELETE** `/contact/:id`

Delete contact submission.

---

## Gallery Management Endpoints

### 1. Create Gallery Item

**POST** `/gallery`

Add a new image to the gallery.

**Request Body:**

```json
{
  "image": "https://example.com/gallery.jpg",
  "title": "Hotel Lobby",
  "category": "interior",
  "description": "Beautiful hotel lobby area"
}
```

---

### 2. Get All Gallery Items

**GET** `/gallery`

Retrieve all gallery images.

---

### 3. Get Gallery by Category

**GET** `/gallery/category/:category`

Retrieve gallery images by category.

**Path Parameters:**

- `category`: Gallery category (string)

---

### 4. Get Gallery Item by ID

**GET** `/gallery/:id`

Retrieve specific gallery item.

---

### 5. Update Gallery Item

**PATCH** `/gallery/:id`

Update gallery item details.

---

### 6. Delete Gallery Item

**DELETE** `/gallery/:id`

Delete gallery item.

---

## General Info Endpoints

### 1. Get All General Info

**GET** `/general-info`

Retrieve general hotel information.

---

### 2. Create General Info

**POST** `/general-info/create`

Add general hotel information.

**Request Body:**

```json
{
  "key": "hotel_address",
  "value": "123 Main Street, City, Country",
  "description": "Main hotel address"
}
```

---

### 3. Update General Info

**PATCH** `/general-info/:id`

Update general information.

---

## Newsletter Subscription Endpoints

### 1. Subscribe to Newsletter

**POST** `/subscribe`

Subscribe to newsletter.

**Request Body:**

```json
{
  "email": "john@example.com"
}
```

---

### 2. Get All Subscriptions

**GET** `/subscribe`

Retrieve all newsletter subscriptions.

---

### 3. Get Subscription by ID

**GET** `/subscribe/:id`

Retrieve specific subscription details.

---

### 4. Delete Subscription

**DELETE** `/subscribe/:id`

Delete newsletter subscription.

---

## Testimonial Endpoints

### 1. Get All Testimonials

**GET** `/testimonials`

Retrieve all customer testimonials.

---

### 2. Get Testimonial by ID

**GET** `/testimonials/:id`

Retrieve specific testimonial.

---

### 3. Create Testimonial

**POST** `/testimonials/create`

Add a new customer testimonial.

**Request Body:**

```json
{
  "customerName": "John Doe",
  "rating": 5,
  "comment": "Excellent service and beautiful rooms!",
  "customerImage": "https://example.com/customer.jpg",
  "roomType": "Deluxe Suite"
}
```

---

### 4. Update Testimonial

**PATCH** `/testimonials/:id`

Update testimonial details.

---

### 5. Delete Testimonial

**DELETE** `/testimonials/:id`

Delete testimonial.

---

## Error Handling

### Standard Error Response Format

```json
{
  "success": false,
  "message": "Error message",
  "errorMessages": [
    {
      "path": "field_name",
      "message": "Validation error message"
    }
  ]
}
```

### Common HTTP Status Codes

- `200` - OK: Request successful
- `201` - Created: Resource created successfully
- `400` - Bad Request: Invalid request data
- `401` - Unauthorized: Authentication required
- `403` - Forbidden: Insufficient permissions
- `404` - Not Found: Resource not found
- `500` - Internal Server Error: Server error

---

## Authentication & Authorization

### User Roles

- `admin`: Full system access
- `manager`: Room and content management
- `stuff`: Limited operational access
- `accounts`: Financial and booking management
- `user`: Basic customer access

### Authentication Methods

- JWT tokens stored in HTTP-only cookies
- Bearer token in Authorization header (alternative)

### Protected Routes

Most endpoints require authentication. Check individual endpoint documentation for required roles.

---

## Frontend Integration Summary

### Quick Start Guide for Frontend Developers

1. **Base URL**: `http://localhost:5000/api/v1`

2. **Authentication Flow**:

   - Use `/auth/signup` for user registration
   - Use `/auth/login` for authentication
   - Store received JWT token securely
   - Include token in cookie for protected routes

3. **Common Endpoints**:

   - **Public**: `/rooms`, `/banners`, `/blogs`, `/testimonials`, `/gallery`
   - **Auth Required**: `/auth/login/edit-me`, `/auth/logout`
   - **Admin Only**: User management, room creation/deletion

4. **Data Validation**:

   - All requests are validated using Zod schemas
   - Check validation rules in documentation
   - Handle 400 errors for invalid data

5. **Response Format**:

   - All responses follow consistent format
   - Check `success` field for request status
   - Use `data` field for actual response data
   - Handle `meta` field for pagination info

6. **Error Handling**:

   - Implement proper error handling for 401/403 responses
   - Redirect to login for authentication errors
   - Show user-friendly messages for validation errors

7. **File Uploads**:
   - Image URLs should be provided as strings
   - Use valid URL format for all image fields
   - Consider implementing image upload service

This API provides a complete backend solution for a hotel booking system with user management, room booking, content management, and customer engagement features.
