# Funshala Preschool Full-Stack Application

This project has been upgraded to a full-stack application with a Node.js backend and a React frontend.

## Project Structure

- `/`: Contains the React frontend application.
- `/server`: Contains the Node.js, Express, and MongoDB backend application.
- `/server/uploads`: This folder will be created automatically by the server to store uploaded gallery images.

## Prerequisites

- Node.js and npm (or yarn)
- A MongoDB Atlas account for the cloud database.

## Backend Setup (Server)

1.  **Navigate to the server directory:**
    ```bash
    cd server
    ```

2.  **Install dependencies:**
    The `package.json` file is now included in the `server` directory. Simply run:
    ```bash
    npm install
    ```

3.  **Create an environment file:**
    Create a `.env` file in the `/server` directory and add the following variables.

    ```env
    PORT=5000
    MONGO_URI=mongodb+srv://rishu:rishu123@cluster0.hs00yvv.mongodb.net/funshala?retryWrites=true&w=majority
    JWT_SECRET=a_very_secret_key_for_your_jwt_tokens
    ```
    *Note: The `MONGO_URI` has been configured to connect to your live MongoDB Atlas account. Your data will now be stored in the cloud and accessible from anywhere.*

4.  **Seed the database (First Time Setup):**
    To populate the database with initial programs, events, and a default admin user, run the seeder script:
    ```bash
    npm run data:import
    ```
    This will create an admin account with the following credentials:
    -   **Email:** `admin@funshala.com`
    -   **Password:** `password123`
    
    *Important: You should log in and change this password in a real-world application.*

5.  **Run the backend server:**
    ```bash
    npm run dev
    ```
    The server should now be running in development mode on `http://localhost:5000`.

## Frontend Setup (Client)

The frontend setup remains the same. It will automatically connect to the backend server running on port 5000.

1.  Open the `index.html` file in your browser or serve it using a simple HTTP server.

## How to Use the Admin Panel

1.  **Navigate to the Admin Login page** on the website (via the "Admin Login" link in the footer).
2.  **Login:** Use the default credentials created by the seeder script (`admin@funshala.com` / `password123`).
3.  **Manage Data:** Once logged in, you can fully manage Students, Programs, Events, Gallery images, and view all form submissions from the dashboard.
