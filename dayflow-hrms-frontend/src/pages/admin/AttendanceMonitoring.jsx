import React, { useState } from 'react';
import {
    Calendar as CalendarIcon, Filter, Download,
    Clock, CheckCircle, XCircle, AlertTriangle, MoreHorizontal
} from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

import { useAttendance } from '../../context/AttendanceContext';

const AttendanceMonitoring = () => {
    const [dateRange, setDateRange] = useState('Today');
    const { records } = useAttendance();

    // Sort records so "Today" comes first if exists
    // const attendanceData = [...records].sort((a, b) => b.id - a.id);
    // Use records from context if available, else fallback or use records directly
    const attendanceData = records && records.length > 0 ? [...records].sort((a, b) => b.id - a.id) : [];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Present': return 'success';
            case 'Late': return 'warning';
            case 'Absent': return 'danger';
            case 'On Leave': return 'primary';
            default: return 'secondary';
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-12">

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-6">

                {/* Header & Controls */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Attendance Monitoring</h1>
                        <p className="text-slate-500">Track and manage employee attendance in real-time.</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center bg-white border border-slate-300 rounded-lg px-3 py-2 shadow-sm">
                            <CalendarIcon className="h-4 w-4 text-slate-500 mr-2" />
                            <select
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                className="bg-transparent border-none text-sm font-medium text-slate-700 focus:ring-0 p-0 cursor-pointer"
                            >
                                <option>Today</option>
                                <option>Yesterday</option>
                                <option>This Week</option>
                                <option>This Month</option>
                            </select>
                        </div>
                        <Button variant="secondary">
                            <Filter className="h-4 w-4 mr-2" /> Filter
                        </Button>
                        <Button variant="outline">
                            <Download className="h-4 w-4 mr-2" /> Export
                        </Button>
                    </div>
                </div>

                {/* Stats Widget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-slate-500 text-xs font-bold uppercase">Present</p>
                            <p className="text-2xl font-bold text-green-600 mt-1">118</p>
                        </div>
                        <div className="h-10 w-10 bg-green-50 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-slate-500 text-xs font-bold uppercase">Late Arrival</p>
                            <p className="text-2xl font-bold text-yellow-600 mt-1">12</p>
                        </div>
                        <div className="h-10 w-10 bg-yellow-50 rounded-full flex items-center justify-center">
                            <Clock className="h-5 w-5 text-yellow-500" />
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-slate-500 text-xs font-bold uppercase">Absent</p>
                            <p className="text-2xl font-bold text-red-600 mt-1">5</p>
                        </div>
                        <div className="h-10 w-10 bg-red-50 rounded-full flex items-center justify-center">
                            <XCircle className="h-5 w-5 text-red-500" />
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-slate-500 text-xs font-bold uppercase">On Leave</p>
                            <p className="text-2xl font-bold text-blue-600 mt-1">8</p>
                        </div>
                        <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center">
                            <AlertTriangle className="h-5 w-5 text-blue-500" />
                        </div>
                    </div>
                </div>

                {/* Main Table */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-100">
                            <thead className="bg-slate-50/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Employee</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Check In</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Check Out</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Work Hours</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-100">
                                {attendanceData.map((record) => (
                                    <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-9 w-9 bg-slate-100 rounded-full border border-white shadow-sm flex items-center justify-center font-bold text-slate-600 text-sm">
                                                    {record.name.charAt(0)}
                                                </div>
                                                <div className="ml-3">
                                                    <div className="text-sm font-medium text-slate-900">{record.name}</div>
                                                    <div className="text-xs text-slate-500">{record.role}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 font-medium">
                                            {record.checkIn}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                            {record.checkOut}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                                            {record.duration}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Badge variant={getStatusColor(record.status)}>
                                                {record.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                            {record.location}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <button className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-100">
                                                <MoreHorizontal className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Footer */}
                    <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
                        <div className="text-sm text-slate-500">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">143</span> results
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 border border-slate-200 rounded text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50">Previous</button>
                            <button className="px-3 py-1 border border-slate-200 rounded text-sm text-slate-600 hover:bg-slate-50">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceMonitoring;
