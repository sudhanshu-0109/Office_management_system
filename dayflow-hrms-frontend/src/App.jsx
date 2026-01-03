import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout'; // New Layout
import Dashboard from './pages/employee/Dashboard';
import Attendance from './pages/employee/Attendance';
import Leave from './pages/employee/Leave';
import EmployeePayroll from './pages/employee/Payroll'; // Aliased
import Profile from './pages/employee/Profile';

import AdminDashboard from './pages/admin/Dashboard'; // Keeping this for overview if needed
import EmployeeGrid from './pages/admin/EmployeeList';
import AdminEmployeeProfile from './pages/admin/EmployeeProfile';
import AttendanceMonitoring from './pages/admin/AttendanceMonitoring';
import AdminPayroll from './pages/admin/Payroll'; // Aliased
import Leaves from './pages/admin/Leaves';
import Reports from './pages/admin/Reports';

import { AttendanceProvider } from './context/AttendanceContext';
import { EmployeeProvider } from './context/EmployeeContext';
import { LeaveProvider } from './context/LeaveContext';

function App() {
  return (
    <AttendanceProvider>
      <EmployeeProvider>
        <LeaveProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/employee" element={<MainLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="attendance" element={<Attendance />} />
                <Route path="leave" element={<Leave />} />
                <Route path="payroll" element={<EmployeePayroll />} />
                <Route path="profile" element={<Profile />} />
                {/* Add other child routes here later */}
              </Route>
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="employees" element={<EmployeeGrid />} />
                <Route path="employees/:id" element={<AdminEmployeeProfile />} />
                <Route path="attendance" element={<AttendanceMonitoring />} />
                <Route path="payroll" element={<AdminPayroll />} />
                <Route path="leaves" element={<Leaves />} />
                <Route path="reports" element={<Reports />} />
                {/* Redirect root admin to employees as it's the main feature requested */}
                <Route index element={<Navigate to="/admin/employees" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </LeaveProvider>
      </EmployeeProvider>
    </AttendanceProvider>
  )
}

export default App
