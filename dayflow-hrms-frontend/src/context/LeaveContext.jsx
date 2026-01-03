import React, { createContext, useContext, useState } from 'react';

const LeaveContext = createContext();

export const useLeaves = () => useContext(LeaveContext);

export const LeaveProvider = ({ children }) => {
    // Initial static mock data
    const initialRequests = [
        { id: 1, employeeId: 'DF-042', name: 'Sunny Gautam', type: 'Sick Leave', from: '2026-02-12', to: '2026-02-14', days: 3, status: 'Approved', reason: 'Viral fever', appliedOn: '2026-02-10' },
        { id: 2, employeeId: 'DF-042', name: 'Sunny Gautam', type: 'Casual Leave', from: '2026-03-05', to: '2026-03-05', days: 1, status: 'Pending', reason: 'Personal work', appliedOn: '2026-02-28' },
        { id: 3, employeeId: 'DF-045', name: 'Sarah Jenkins', type: 'Paid Leave', from: '2026-01-10', to: '2026-01-15', days: 5, status: 'Rejected', reason: 'Project deadline', appliedOn: '2026-01-05' },
    ];

    const [requests, setRequests] = useState(initialRequests);

    const addRequest = (requestData) => {
        const newRequest = {
            id: Date.now(),
            employeeId: 'DF-042', // Mocking current user ID
            name: 'Sunny Gautam', // Mocking current user Name
            status: 'Pending',
            appliedOn: new Date().toISOString().split('T')[0],
            ...requestData
        };
        setRequests(prev => [newRequest, ...prev]);
    };

    const updateRequestStatus = (id, newStatus) => {
        setRequests(prev => prev.map(req => req.id === id ? { ...req, status: newStatus } : req));
    };

    return (
        <LeaveContext.Provider value={{ requests, addRequest, updateRequestStatus }}>
            {children}
        </LeaveContext.Provider>
    );
};
