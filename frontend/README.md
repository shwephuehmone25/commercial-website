# Frontend - Product Management System

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Scripts](#scripts)
- [Contributing](#contributing)

## Introduction

This is the **frontend** of the product Management System, built using **React**. It provides a user-friendly interface for managing product information. The frontend communicates with the backend API to retrieve and manipulate data in real-time. 

## Features
- **product Management**: Manage product information, associate products, and upload profile pictures.
- **Authentication**: Secure login and registration using JWT-based authentication.
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices.

## Technologies Used

- **React**: A JavaScript library for building dynamic user interfaces.
- **React Router**: For client-side routing and navigation.
- **Axios**: For making HTTP requests to the backend API.
- **TailwindCSS** or **SCSS**: For responsive, modern styling.
- **React Testing Library** / **Jest**: For unit and integration testing of components.

## Installation

Follow these steps to set up and run the frontend locally:

### Prerequisites
Make sure you have the following software installed:
- [Node.js](https://nodejs.org/en/) (version 14.x or higher)

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shwephuehmone25/commercial-website
   cd frontend

2. **Install dependencies:**
    ```bash
    npm install
3. **Set up environment variables:**
    ```bash
    VITE_API=http://localhost:7000
    ```
    The REACT_APP_API_URL should point to the backend API URL.

## Usage ## 

**Start the development server:**

```bash
npm run dev
```
The frontend will be available at http://localhost:5173.

