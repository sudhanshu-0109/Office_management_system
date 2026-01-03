import React from 'react';
import { Users, FileText, UserX, BarChart3, TrendingUp } from 'lucide-react';
import SmartApprovalPanel from '../../components/admin/SmartApprovalPanel';

const AdminDashboard = () => {
    // Mock data
    const stats = [
        { label: 'Total Employees', value: '124', change: '+4 this month', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Pending Requests', value: '8', change: '3 urgent', icon: FileText, color: 'text-orange-600', bg: 'bg-orange-50' },
        { label: 'Absent Today', value: '5', change: '2 planned', icon: UserX, color: 'text-pink-600', bg: 'bg-pink-50' },
        { label: 'Avg. Attendance', value: '94%', change: '+1.2%', icon: BarChart3, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Admin Overview</h1>
                        <p className="text-slate-500">Manage your workforce at a glance.</p>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-lg p-1 px-3 flex items-center gap-2 text-sm text-slate-600">
                        <div className="bg-green-500 h-2 w-2 rounded-full animate-pulse"></div>
                        System Healthy
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                                    <h3 className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</h3>
                                </div>
                                <div className={`p-3 rounded-xl ${stat.bg}`}>
                                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center gap-1 text-sm font-medium text-emerald-600">
                                <TrendingUp className="h-3 w-3" />
                                <span>{stat.change}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Smart Engine Section */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-900">Action Required</h2>
                    <SmartApprovalPanel />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
