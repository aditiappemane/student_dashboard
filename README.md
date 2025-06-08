# Student Management Dashboard

A comprehensive student management dashboard with real-time statistics and visualizations.

## Features

- Secure login system
- Real-time student statistics
- Class-wise student distribution
- Sports participation visualization
- Auto-refresh every 5 minutes

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

1. Clone the repository
2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd client
   npm install
   ```

4. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=mongodb://localhost:27017/student_dashboard
   JWT_SECRET=your-secret-key
   PORT=5000
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

6. In a new terminal, start the frontend development server:
   ```bash
   cd client
   npm start
   ```

7. Access the application at `http://localhost:3000`

## Default Login Credentials

- Username: admin
- Password: admin123

## Technologies Used

- Frontend:
  - React
  - Material-UI
  - Recharts
  - Axios
  - React Router

- Backend:
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - JWT Authentication 