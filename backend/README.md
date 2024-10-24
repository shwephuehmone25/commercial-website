# Full-Stack Product Management System

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)

## Introduction

This is a Full-Stack Product Management System that allows users to manage products. The application is built using **React** for the frontend and **Express.js** for the backend, with a **MongoDB** database for storing product data. The system supports authentication and role-based access control (RBAC) for securing sensitive operations like creating, updating, or deleting records.

## Features

- **User Authentication**: Secure login and registration with JWT.
- **Product Management**: Create, update, and delete product records.
- **Role-Based Access Control**: Restrict access to certain operations based on user roles (e.g., admin).
- **Responsive Design**: UI adapts for desktop, tablet, and mobile devices.

## Technologies Used

### Frontend
- **React**: A library for building user interfaces.
- **React Router**: For managing navigation within the app.
- **Axios**: For making HTTP requests to the backend API.
- **TailwindCSS** / **SCSS**: For responsive and maintainable styling.
- **React Testing Library** / **Jest**: For unit and integration testing of React components.

### Backend
- **Node.js**: JavaScript runtime for the backend.
- **Express.js**: A web framework for building the API.
- **MongoDB**: NoSQL database for storing product data.
- **Mongoose**: ODM for MongoDB.
- **JWT**: Used for secure authentication.
- **bcrypt.js**: For hashing passwords.
- **Jest** / **Supertest**: For testing the API endpoints.

## Installation

Follow these steps to set up the project locally:

### Prerequisites
Ensure that you have the following software installed:
- [Node.js](https://nodejs.org/en/) (version 14.x or higher)
- [MongoDB](https://www.mongodb.com/) (for the database)

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shwephuehmone25/commercial-website
   cd commercial-website
2. **Install dependencies for both frontend and backend:**

    **Backend:**
    ```bash
    cd ../backend
    npm install
3. **Configuration in `.env` file:**

    Database **eg.**
    ```bash
    PORT=****
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
3. **Start the backend server:**

    ```bash
    cd backend
    npm run start

    Backend Tests
4. **To run tests for the backend using Jest and Supertest:

    ```bash
    cd backend
    k6 run test.js

5. **API Endpoints**

| Method | Endpoint               | Description                       |
|--------|------------------------|-----------------------------------|
| POST   | `/api/create/product`       | Create a new product              |
| GET    | `/api/products`       | Retrieve all companies            |
| GET    | `/api/product/{id}`  | Retrieve a specific product       |
| PUT    | `/api/edit/:id`  | Update a specific product        |
| DELETE | `/api/delete/product/:id`  | Delete a specific product        |
