import React from 'react';
import {
    BarChart3, PieChart, TrendingUp, Download,
    FileText, Star, Filter, Share2, Plus
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Button from '../../components/common/Button';

const Reports = () => {

    const engagementData = [
        { name: 'Mon', active: 90 },
        { name: 'Tue', active: 85 },
        { name: 'Wed', active: 94 },
        { name: 'Thu', active: 88 },
        { name: 'Fri', active: 80 },
    ];

    const reportCategories = [
        { id: 1, name: 'Attendance & Punctuality', count: 12, color: 'bg-emerald-100 text-emerald-700' },
        { id: 2, name: 'Leave & Time Off', count: 8, color: 'bg-blue-100 text-blue-700' },
        { id: 3, name: 'Compensation', count: 15, color: 'bg-purple-100 text-purple-700' },
        { id: 4, name: 'Performance', count: 6, color: 'bg-orange-100 text-orange-700' },
        { id: 5, name: 'Recruitment', count: 9, color: 'bg-pink-100 text-pink-700' },
        { id: 6, name: 'Compliance', count: 4, color: 'bg-slate-100 text-slate-700' },
    ];

    const featuredReports = [
        { id: 1, title: 'Monthly Attendance Summary', date: 'Last generated: 2 hrs ago', views: 245 },
        { id: 2, title: 'Salary Distribution Analysis', date: 'Last generated: Yesterday', views: 180 },
        { id: 3, title: 'Employee Turnover Rate', date: 'Last generated: 3 days ago', views: 120 },
    ];

    return (
        <div className="min-h-screen bg-slate-50 pb-12">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">

                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Analytics & Reports</h1>
                        <p className="text-slate-500">Data-driven insights for your workforce.</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
                        <Button variant="primary"><Plus className="h-4 w-4 mr-2" /> New Report</Button>
                    </div>
                </div>

                {/* Featured / Carousel */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {featuredReports.map((report) => (
                        <div key={report.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                    <BarChart3 className="h-6 w-6" />
                                </div>
                                <Star className="h-5 w-5 text-slate-300 hover:text-yellow-400" />
                            </div>
                            <h3 className="font-bold text-slate-900 mb-1">{report.title}</h3>
                            <p className="text-xs text-slate-500 flex items-center gap-2">
                                <span>{report.date}</span> • <span>{report.views} views</span>
                            </p>
                            <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
                                <button className="flex-1 text-xs font-semibold text-slate-600 hover:bg-slate-50 py-2 rounded">Preview</button>
                                <button className="flex-1 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 py-2 rounded">Run Now</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Categories Grid */}
                <div>
                    <h3 className="font-bold text-lg text-slate-900 mb-4">Report Categories</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {reportCategories.map(cat => (
                            <div key={cat.id} className="bg-white p-4 rounded-xl border border-slate-200 text-center hover:border-indigo-300 transition-colors cursor-pointer">
                                <div className={`h-10 w-10 mx-auto rounded-full flex items-center justify-center mb-3 ${cat.color}`}>
                                    <FileText className="h-5 w-5" />
                                </div>
                                <p className="font-bold text-sm text-slate-800">{cat.name}</p>
                                <p className="text-xs text-slate-400 mt-1">{cat.count} reports</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Insights & Chart */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-slate-900">Engagement Trends</h3>
                            <select className="text-xs border-none bg-slate-50 rounded px-2 py-1 font-medium text-slate-600">
                                <option>Last 7 Days</option>
                                <option>Last 30 Days</option>
                            </select>
                        </div>
                        <div className="h-72 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={engagementData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ border: 'none', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                    <Bar dataKey="active" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-900 to-indigo-800 rounded-xl text-white p-6 shadow-xl">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" /> AI Insights
                        </h3>
                        <div className="space-y-4">
                            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/10">
                                <p className="text-sm font-medium leading-relaxed">
                                    "Attendance drops by <span className="text-orange-300 font-bold">15% on Fridays</span> after payday. Consider implementing flexible Friday hours."
                                </p>
                            </div>
                            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/10">
                                <p className="text-sm font-medium leading-relaxed">
                                    "Department X has <span className="text-orange-300 font-bold">30% higher overtime</span> than average. Review staffing levels."
                                </p>
                            </div>
                        </div>
                        <button className="w-full mt-6 py-2.5 bg-white text-indigo-900 font-bold rounded-lg hover:bg-indigo-50 transition-colors">
                            Generate More Insights
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Reports;
