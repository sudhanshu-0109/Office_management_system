# 🌞 Dayflow HRMS

**Every Workday, Perfectly Aligned.**

Dayflow is a modern, full-stack **Human Resource Management System (HRMS)** designed to streamline employee management, attendance tracking, and internal organizational workflows. Built with a robust **Django REST backend** and a dynamic **React (Vite) frontend**, Dayflow delivers a smooth and responsive experience for both **Administrators** and **Employees**.

---

## 🚀 Key Features

* **👥 Employee Management**
  Create, update, and manage employee profiles with department and role-based organization.

* **🔐 Secure Authentication**
  JWT-based authentication using role-based access control (Admin vs Employee).

* **⏱️ Attendance Tracking**
  Real-time Check-in / Check-out system with attendance status indicators:
  🟢 Present | 🟡 Absent | ✈️ On Leave

* **📊 Interactive Dashboard**
  Visual overview of total employees, attendance statistics, and quick admin actions.

* **📱 Fully Responsive UI**
  Modern, mobile-first design built using Tailwind CSS.

---

## 🛠️ Tech Stack

### 🔷 Frontend

* **Framework**: React 19 (Vite)
* **Styling**: Tailwind CSS, PostCSS
* **Icons**: Lucide React
* **State Management**: Context API
* **API Communication**: Axios
* **Charts & Visualization**: Recharts

### 🔷 Backend

* **Framework**: Django 6.0
* **API**: Django REST Framework (DRF)
* **Authentication**: JWT (SimpleJWT)
* **Database**: SQLite (Development) / PostgreSQL (Production-ready)
* **Async & Real-time Support**: Django Channels, Daphne

---

## 🏁 Getting Started

Follow the steps below to run the project locally.

---

### 1️⃣ Backend Setup (Django)

Navigate to the backend directory:

```bash
cd dayflow-hrms-backend
```

Create and activate a virtual environment (recommended):

```bash
python -m venv venv
# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run database migrations:

```bash
python manage.py migrate
```

Start the backend server:

```bash
python manage.py runserver
```

📍 Backend API runs at: **[http://127.0.0.1:8000](http://127.0.0.1:8000)**

---

### 2️⃣ Frontend Setup (React)

Open a new terminal and navigate to the frontend directory:

```bash
cd dayflow-hrms-frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

📍 Frontend runs at: **[http://localhost:5173](http://localhost:5173)**

---

## 📂 Project Structure

```bash
Dayflow-HRMS/
├── dayflow-hrms-backend/   # Django backend
├── dayflow-hrms-frontend/  # React frontend
├── README.md
└── .gitignore
```

---

## 📄 License

This project is developed for **educational and hackathon purposes only**.

---

## 🤝 Contributors

* **Sunny Gautam, Sudhanshu Ranjan, Stavan Katrojwar and Ganpati Kumar** – Developer

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub to show your support!
