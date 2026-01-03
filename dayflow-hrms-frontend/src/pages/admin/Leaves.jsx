import React, { useState } from 'react';
import {
    Calendar, CheckCircle, XCircle, Clock, MoreHorizontal,
    ChevronRight, Users, Settings, Plus
} from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { useLeaves } from '../../context/LeaveContext';

const Leaves = () => {
    const [activeTab, setActiveTab] = useState('pending');
    const { requests, updateRequestStatus } = useLeaves();

    // Derived Stats
    const pendingCount = requests.filter(r => r.status === 'Pending').length;
    const leaveTodayCount = 12; // Placeholder for now, or derive if dates match
    const upcomingCount = requests.filter(r => r.status === 'Approved').length;

    const filteredRequests = requests.filter(r => {
        if (activeTab === 'history') return true;
        // Match context status (Title Case) with tab state (lowercase)
        if (activeTab === 'pending') return r.status === 'Pending';
        if (activeTab === 'approved') return r.status === 'Approved';
        if (activeTab === 'rejected') return r.status === 'Rejected';
        return true;
    });

    const handleAction = (id, status) => {
        updateRequestStatus(id, status);
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-12">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Time Off Management</h1>
                        <p className="text-slate-500">Manage leave requests and policies.</p>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                        <Button variant="outline" className="flex-1 md:flex-none justify-center"><Settings className="h-4 w-4 mr-2" /> Policy Settings</Button>
                        <Button variant="primary" className="flex-1 md:flex-none justify-center"><Plus className="h-4 w-4 mr-2" /> Add Leave</Button>
                    </div>
                </div>

                {/* Overview Tiles */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex justify-between">
                            <p className="text-xs font-bold text-slate-500 uppercase">On Leave Today</p>
                            <Users className="h-5 w-5 text-indigo-500" />
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mt-2">{leaveTodayCount}</h3>
                        <div className="flex -space-x-2 mt-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="h-8 w-8 rounded-full bg-slate-200 border-2 border-white"></div>
                            ))}
                            <div className="h-8 w-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs text-slate-500">+8</div>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex justify-between">
                            <p className="text-xs font-bold text-slate-500 uppercase">Pending Requests</p>
                            <Clock className="h-5 w-5 text-orange-500" />
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mt-2">{pendingCount}</h3>
                        <p className="text-xs text-orange-600 mt-2 font-medium">Action required</p>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex justify-between">
                            <p className="text-xs font-bold text-slate-500 uppercase">Upcoming Approved</p>
                            <Calendar className="h-5 w-5 text-emerald-500" />
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mt-2">{upcomingCount}</h3>
                        <p className="text-xs text-slate-500 mt-2">Planned leaves</p>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex justify-between">
                            <p className="text-xs font-bold text-slate-500 uppercase">Avg. Balance</p>
                            <CheckCircle className="h-5 w-5 text-blue-500" />
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mt-2">14.2</h3>
                        <p className="text-xs text-slate-500 mt-2">Days per employee</p>
                    </div>
                </div>

                {/* Request Management */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="border-b border-slate-100 px-6 py-4 flex gap-6 overflow-x-auto no-scrollbar">
                            {['pending', 'approved', 'rejected', 'history'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`text-sm font-medium pb-4 -mb-4 border-b-2 transition-colors capitalize whitespace-nowrap ${activeTab === tab ? 'text-indigo-600 border-indigo-600' : 'text-slate-500 border-transparent hover:text-slate-700'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="p-6 space-y-4">
                            {filteredRequests.length === 0 ? (
                                <div className="text-center py-12 text-slate-400">
                                    <p>No {activeTab} requests found.</p>
                                </div>
                            ) : (
                                filteredRequests.map(req => (
                                    <div key={req.id} className="border border-slate-100 rounded-xl p-4 hover:shadow-md transition-shadow">
                                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                            <div className="flex gap-4">
                                                <img
                                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${req.name}`}
                                                    alt=""
                                                    className="h-10 w-10 rounded-full bg-slate-100"
                                                />
                                                <div>
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <h4 className="font-bold text-slate-900">{req.name}</h4>
                                                        <span className="text-xs text-slate-500">• {req.employeeId}</span>
                                                    </div>
                                                    <div className="flex flex-wrap items-center gap-2 mt-1">
                                                        <Badge variant="primary" className="text-xs">{req.type}</Badge>
                                                        <span className="text-sm text-slate-600 font-medium">{req.from} - {req.to}</span>
                                                        <span className="text-xs text-slate-400">({req.days} days)</span>
                                                    </div>
                                                    <p className="text-sm text-slate-500 mt-2 italic">"{req.reason}"</p>
                                                </div>
                                            </div>
                                            {(req.status === 'Pending') && (
                                                <div className="flex gap-2 w-full sm:w-auto">
                                                    <button
                                                        onClick={() => handleAction(req.id, 'Approved')}
                                                        className="flex-1 sm:flex-none bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-100 transition-colors"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction(req.id, 'Rejected')}
                                                        className="flex-1 sm:flex-none bg-red-50 text-red-700 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            )}
                                            {req.status !== 'Pending' && (
                                                <Badge variant={req.status === 'Approved' ? 'success' : 'danger'}>
                                                    {req.status}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Policies & Tools */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-800 mb-4">Leave Policies</h3>
                            <div className="space-y-3">
                                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-semibold text-slate-800 text-sm">Annual Leave</span>
                                        <span className="text-xs bg-white border border-slate-200 px-2 py-0.5 rounded">20 days</span>
                                    </div>
                                    <p className="text-xs text-slate-500">Max 10 consecutive days allowed.</p>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-semibold text-slate-800 text-sm">Sick Leave</span>
                                        <span className="text-xs bg-white border border-slate-200 px-2 py-0.5 rounded">12 days</span>
                                    </div>
                                    <p className="text-xs text-slate-500">Medical cert required &gt; 3 days.</p>
                                </div>
                            </div>
                            <button className="w-full mt-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-100 rounded-lg hover:bg-indigo-50">View All Policies</button>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-6 rounded-xl text-white shadow-lg">
                            <h3 className="font-bold text-lg">Team Coverage</h3>
                            <p className="text-indigo-100 text-sm mt-1 mb-4">You have 3 days next week with low availability.</p>
                            <div className="h-24 bg-white/10 rounded-lg flex items-center justify-center text-sm font-medium">
                                heatmap_placeholder
                            </div>
                            <button className="w-full mt-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-bold transition-colors">View Schedule</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Leaves;
