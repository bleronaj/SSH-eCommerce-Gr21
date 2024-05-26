# E-commerce App

## Overview
This project is an e-commerce application featuring a REST API built using Node.js and Express.js, with MongoDB as the database. The frontend is built with React and Redux. The application supports user authentication, product browsing, shopping card management, and order placement.

## Features

- User authentication and registration
- Product browsing and searching
- Shopping cart management
- Order placement and tracking
- Admin panel for managing products, orders, and users
- Responsive design for various devices

## Getting Started

### Prerequisites

- Node.js (version 14.x or higher)
- npm (version 6.x or higher)
- MongoDB (local or Atlas)
  
## Installation and Usage

1. **Installation**
   - Clone the repository: `git clone https://github.com/bleronaj/SSH-eCommerce-Gr21.git`
   - Navigate to the project directory: `cd ecommerce-app`
   - Install dependencies for both client and server:
    ```bash
    cd client
    npm install
    cd ../server
    npm install
    ```

2. **Usage**
   - Configure environment variables in a `.env` file.
   - Start the server: `npm start`

3. **API Endpoints**
   - `POST /api/v1/auth/register`: Register a new user.

4. **Testing**
   - Use Postman to test API requests and send data to MongoDB Compass for review and management.
  
### Running the Application

1. Start the backend server:

    ```bash
    cd server
    npm run dev
    ```

2. Start the frontend development server:

    ```bash
    cd client
    npm start
    ```

3. Open your browser and navigate to `http://localhost:3000` to view the application.


## Integration and Data Sharing
After testing requests in Postman, follow these steps to send data to MongoDB Compass:

1. Open MongoDB Compass and ensure the MongoDB server is active.
2. Create a new database in MongoDB Compass.
3. For Postman requests, ensure the data is accurate and conforms to the MongoDB format.
4. Use the "Save Response" feature in Postman to save the request response.
5. In MongoDB Compass, select the appropriate database and document to store the data.
6. Click "Refresh" and upload the data from the Postman response to MongoDB Compass.

This process ensures that the data sent from Postman is accurately stored and managed in your MongoDB database. 

## Project Structure

The project's structure is organized as follows:

ecommerce-app/
├── client/              # Frontend application
│   ├── public/          # Public assets
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Application pages
│   │   ├── redux/       # Redux state management
│   │   ├── styles/      # CSS styles
│   │   ├── utils/       # Utility functions
│   │   ├── App.js       # Main application component
│   │   └── index.js     # Entry point of the application
│   ├── .gitignore       # Git ignore file
│   ├── package.json     # npm package configuration
│   └── README.md        # Project README file
├── server/              # Backend application
│   ├── controllers/     # Route controllers
│   ├── models/          # Mongoose models
│   ├── routes/          # Express routes
│   ├── .gitignore       # Git ignore file
│   ├── package.json     # npm package configuration
│   ├── server.js        # Entry point of the server
│   └── README.md        # Project README file
├── .gitignore           # Git ignore file
├── README.md            # Project README file
└── ...                  # Other configuration files

