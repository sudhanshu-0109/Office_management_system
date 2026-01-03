import React, { createContext, useContext, useState, useEffect } from 'react';

const AttendanceContext = createContext();

export const useAttendance = () => useContext(AttendanceContext);

export const AttendanceProvider = ({ children }) => {
    // Mock initial data
    const initialRecords = [
        { id: 101, employeeId: 1, name: 'Sunny Gautam', role: 'Product Designer', date: '2023-10-24', checkIn: '09:00 AM', checkOut: '06:00 PM', duration: '9h 00m', status: 'Present', location: 'Office' },
        { id: 102, employeeId: 2, name: 'Sarah Jenkins', role: 'HR Manager', date: '2023-10-24', checkIn: '09:15 AM', checkOut: '06:30 PM', duration: '9h 15m', status: 'Late', location: 'Office' },
        { id: 103, employeeId: 3, name: 'Mike Ross', role: 'Engineer', date: '2023-10-24', checkIn: '--', checkOut: '--', duration: '0h 00m', status: 'Absent', location: '--' },
        { id: 104, employeeId: 4, name: 'Rachel Zane', role: 'Legal', date: '2023-10-24', checkIn: '08:55 AM', checkOut: '05:00 PM', duration: '8h 05m', status: 'Present', location: 'Remote' },
        { id: 105, employeeId: 5, name: 'Harvey Specter', role: 'VP Sales', date: '2023-10-24', checkIn: '--', checkOut: '--', duration: '0h 00m', status: 'On Leave', location: '--' },
    ];

    const [records, setRecords] = useState(initialRecords);
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [currentUserRecord, setCurrentUserRecord] = useState(null);

    // Helper to format time
    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    const handleCheckIn = () => {
        const now = new Date();
        const timeString = formatTime(now);

        // Create a new record for "Today" for the current user (Sunny Gautam, ID 1)
        const newRecord = {
            id: Date.now(),
            employeeId: 1,
            name: 'Sunny Gautam',
            role: 'Product Designer',
            date: 'Today', // Identifying this as today's live record
            checkIn: timeString,
            checkOut: '--',
            duration: 'Running...',
            status: 'Present',
            location: 'Office' // Defaulting to Office for now
        };

        setRecords(prev => [newRecord, ...prev]);
        setCurrentUserRecord(newRecord);
        setIsCheckedIn(true);
    };

    const handleCheckOut = () => {
        const now = new Date();
        const timeString = formatTime(now);

        setRecords(prev => prev.map(record => {
            // Find the "Today" record for this user
            if (record.employeeId === 1 && record.date === 'Today') {
                // Calculate simplified duration (mock logic for demo)
                return {
                    ...record,
                    checkOut: timeString,
                    duration: '9h 00m' // Mock duration calculation
                };
            }
            return record;
        }));

        setIsCheckedIn(false);
        setCurrentUserRecord(null); // Clear current active session
    };

    return (
        <AttendanceContext.Provider value={{
            records,
            isCheckedIn,
            handleCheckIn,
            handleCheckOut
        }}>
            {children}
        </AttendanceContext.Provider>
    );
};
