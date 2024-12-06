# Train Booking System

A train booking system that allows users to search for available trains between source and destination, book seats, and view their booking details with differnt enpoints for users and admin This application features a secure backend with user authentication, using JWT for secure logins and MySQL for database management.

## Features

- **User  Authentication**: Users can sign up and log in to the system securely.
- **Admin Authentication**: Used api key because of which, only admin can add trains, users can't which makes it secure.
- **Train Search**: Users can search for available trains based on their source and destination.
- **Seat Booking**: Users can book seats on trains.
- **Booking History**: Users can view their past bookings.
## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Token) for secure user login
- **Middleware**: CORS for cross-origin requests, Cookie-parser for cookie management
- **Environment Management**: dotenv for managing environment variables

## Setup Instructions

### Prerequisites

- Node.js (v12 or higher)
- MySQL (v5.7 or higher)

### 1. Clone the Repository

```
$ git clone https://github.com/a3mxn/IRCTC-app.git
$ cd IRCTC-app
```

### 2. Install Dependencies

```
$ npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory of the project and add the following variables:

```
$ DB_HOST=localhost
$ DB_USER=root
$ DB_PASSWORD=your-database-password
$ DB_NAME=trainbooking
$ PORT=8787
$ JWT_SECRET=your-secret-key
$ ADMIN_API_KEY=your-admin-api-key
```

### 4. Database Setup

Make sure you have MySQL installed and running. Create a database by running the following SQL:

```
$ CREATE DATABASE trainbooking;
```

Run the SQL scripts to set up the required tables. You will need tables for users, trains, bookings, etc.
You can manually create the tables
```bash
CREATE DATABASE IF NOT EXISTS trainbooking;

USE trainbooking;

CREATE TABLE IF NOT EXISTS trains (
  id INT AUTO_INCREMENT PRIMARY KEY,
  source VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  total_seats INT NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  train_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (train_id) REFERENCES trains(id)
);
```

### 5. Run the Application

```
$ npm start
```

The server will run on `http://localhost:8787` (or the port defined in `.env`).

## API Endpoints

### Authentication

- **POST** `/api/auth/signup` - Sign up a new user
  - Required fields: `username`, `email`, `password`, `role`
  - role can be out of "user" and "admin"
  
- **POST** `/api/auth/login` - Log in an existing user
  - Required fields: `email`, `password`

### Train Routes

- **POST** `/api/trains/search-train` - Search for available trains between source and destination
  - Required fields: `source`, `destination`

- **POST** `/api/trains/book` - Book a seat on a specific train
  - Requires authentication (JWT)
  - Required fields: `trainId`, `seatNumber`

- **GET** `/api/trains/my-bookings` - View all bookings of the logged-in user
  - Requires authentication (JWT)

### Admin Routes

- **POST** `/api/trains/add` - Add a new train (Admin only)
  - Required fields: `source`, `destination`, `totalSeats`

## Middleware

- **verifyToken**: Protects routes that require user authentication by verifying the JWT.
- **verifyAdmin**: Restricts access to admin routes by validating the API key.
