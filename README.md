# 🎓 Student Management Dashboard

A full-stack student dashboard with login, dynamic card counts, class-wise bar chart, and a sports participation pie chart. Built using **React**, **Node.js**, **Express**, and **MongoDB**.

## 🔐 Login Credentials

- **Username:** `admin`
- **Password:** `admin123`

## 🚀 Features

- 🔑 Login system (admin access)
- 📊 Dashboard on a single screen with:
  - ✅ No. of Active Students
  - ❌ No. of Inactive Students
  - 💰 No. of Students Fee Paid
  - 💸 No. of Students Fee Not Paid
- 📉 **Bar Chart**:
  - Class-wise number of students
  - Class-wise fee paid students
- 🥎 **Pie Chart**:
  - Student participation in sports:
    - Cricket
    - Football
    - Volleyball
    - Hockey
    - Kabaddi
- 🔄 Auto-refresh every 5 minutes via AJAX
- 🗄️ Data fetched from MongoDB backend

## 📁 Project Structure

student-dashboard/
├── client/ # React frontend
├── server/ # Node.js + Express backend
└── README.md

## 🛠 Tech Stack

- **Frontend**: React, Chart.js (or Recharts), Axios, MUI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Other**: CORS, JWT, AJAX

## 🧪 How to Run Locally

1. **Clone the repo** and unzip the folder.
2. **Install server dependencies:**
   ```bash
   cd server
   npm install
   npm start
cd ../client
npm install
npm start

