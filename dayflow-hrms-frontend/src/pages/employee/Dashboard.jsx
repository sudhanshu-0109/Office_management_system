import React from 'react';
import {
    Clock,
    Calendar,
    AlertTriangle,
    CheckCircle,
    ArrowUpRight,
    Coffee
} from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
    // Mock data
    const attendanceData = [
        { day: 'Mon', hours: 8.5 },
        { day: 'Tue', hours: 9.0 },
        { day: 'Wed', hours: 8.0 },
        { day: 'Thu', hours: 8.5 },
        { day: 'Fri', hours: 7.5 },
    ];

    const recentActivity = [
        { type: 'check-in', text: 'Checked in at 09:02 AM', time: 'Today', icon: CheckCircle, color: 'text-green-500' },
        { type: 'leave', text: 'Leave request approved (Feb 12)', time: 'Yesterday', icon: Calendar, color: 'text-primary-500' },
        { type: 'alert', text: 'Late mark detected (Jan 28)', time: '2 days ago', icon: AlertTriangle, color: 'text-orange-500' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Good Morning, Sunny! 👋</h1>
                    <p className="text-slate-500">Here's what's happening today.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm">View Calendar</Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Attendance Card */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="bg-blue-50 p-2.5 rounded-lg">
                            <Clock className="h-6 w-6 text-blue-600" />
                        </div>
                        <Badge variant="success">On Time</Badge>
                    </div>
                    <h3 className="text-slate-500 text-sm font-medium">Today's Status</h3>
                    <div className="mt-2 flex items-baseline">
                        <span className="text-2xl font-bold text-slate-900">09:02 AM</span>
                        <span className="ml-2 text-sm text-slate-400">Checked In</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between text-xs text-slate-500">
                        <span>Duration: 4h 12m</span>
                        <span className="text-blue-600 font-medium cursor-pointer">View History &rarr;</span>
                    </div>
                </div>

                {/* Leave Balance */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="bg-purple-50 p-2.5 rounded-lg">
                            <Coffee className="h-6 w-6 text-purple-600" />
                        </div>
                        <Badge variant="primary">Updated</Badge>
                    </div>
                    <h3 className="text-slate-500 text-sm font-medium">Leave Balance</h3>
                    <div className="mt-2 flex items-baseline">
                        <span className="text-2xl font-bold text-slate-900">12</span>
                        <span className="ml-2 text-sm text-slate-400">days available</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 mt-4">
                        <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                </div>

                {/* Smart Alerts - Premium Feature */}
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-6 rounded-xl shadow-lg text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <AlertTriangle className="h-24 w-24" />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-indigo-100 text-sm font-medium mb-1">Smart Alerts</h3>
                        <h2 className="text-2xl font-bold mb-4">Attention Needed</h2>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-sm border border-white/10 mb-3">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-orange-400"></div>
                                <span>3 Late Marks this month</span>
                            </div>
                        </div>
                        <Button size="sm" variant="secondary" className="w-full justify-between group">
                            View Details <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Charts & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart Section */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-800">Weekly Attendance</h3>
                        <select className="text-sm border-slate-200 rounded-lg text-slate-500">
                            <option>This Week</option>
                            <option>Last Week</option>
                        </select>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={attendanceData}>
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                                <YAxis hide />
                                <Tooltip
                                    cursor={{ fill: '#f1f5f9' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="hours" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Timeline Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Recent Activity</h3>
                    <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-3.5 before:w-px before:bg-slate-200">
                        {recentActivity.map((item, index) => (
                            <div key={index} className="relative flex gap-4">
                                <div className={`
                    absolute left-0 p-1.5 rounded-full ring-4 ring-white z-10 
                    ${index === 0 ? 'bg-indigo-50' : 'bg-slate-50'}
                  `}>
                                    <item.icon className={`h-4 w-4 ${item.color}`} />
                                </div>
                                <div className="pl-6">
                                    <p className="text-sm font-medium text-slate-800">{item.text}</p>
                                    <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
