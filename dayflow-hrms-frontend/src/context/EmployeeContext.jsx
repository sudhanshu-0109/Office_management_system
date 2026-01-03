import React, { createContext, useContext, useState } from 'react';
import { authService, employeeService } from '../services/api';

const EmployeeContext = createContext();

export const useEmployees = () => useContext(EmployeeContext);

export const EmployeeProvider = ({ children }) => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch employees on load
    React.useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const data = await employeeService.getAll();
            setEmployees(data);
        } catch (error) {
            console.error("Failed to fetch employees", error);
        } finally {
            setLoading(false);
        }
    };

    const addEmployee = async (newEmployee) => {
        try {
            const created = await employeeService.create(newEmployee);
            setEmployees(prev => [created, ...prev]);
            return { success: true };
        } catch (error) {
            console.error("Failed to add employee", error);
            // Return error message from backend if available
            const msg = error.response?.data?.detail || error.response?.data || "Failed to add employee";
            return { success: false, message: JSON.stringify(msg) };
        }
    };

    const login = async (email, password, role) => {
        try {
            // Attempt API Login
            await authService.login(email, password);
             
            // If successful, fetch profile to get role and details
            const profile = await authService.getProfile();
            
            // Basic role check
            if (role === 'admin' && (profile.role !== 'admin' && profile.role !== 'hr')) {
                return { success: false, message: 'Access Denied: You are not an Admin/HR' };
            }

            // Construct user object
            const user = {
                ...profile,
                name: `${profile.first_name} ${profile.last_name}`,
                // Use profile.logo if available, else dicebear
                image: profile.logo || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.first_name}`,
                companyName: profile.company_name
            };
            
            return { success: true, user };

        } catch (err) {
            console.error("Login failed", err);
            return { success: false, message: err.response?.data?.detail || 'Invalid Credentials' };
        }
    };

    const updateEmployee = async (id, updatedData) => {
        try {
            const updated = await employeeService.update(id, updatedData);
            setEmployees(prev => prev.map(emp => emp.id === id ? updated : emp));
            return { success: true };
        } catch (error) {
            console.error("Failed to update employee", error);
             return { success: false, message: "Failed to update" };
        }
    };

    const deleteEmployee = async (id) => {
         try {
            await employeeService.delete(id);
            setEmployees(prev => prev.filter(emp => emp.id !== id));
        } catch (error) {
            console.error("Failed to delete employee", error);
        }
    };

    return (
        <EmployeeContext.Provider value={{ employees, loading, addEmployee, updateEmployee, deleteEmployee, login }}>
            {children}
        </EmployeeContext.Provider>
    );
};
