import React, { useState } from 'react';
import {
    DollarSign, Users, CheckCircle, AlertCircle, Calendar,
    Download, Upload, Send, ChevronLeft, ChevronRight,
    MoreVertical, Filter, Play, Archive, FileText, Plus
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';

const Payroll = () => {
    const [currentPeriod, setCurrentPeriod] = useState({ month: 'October', year: 2023 });
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [payrollStatus, setPayrollStatus] = useState('Pending');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleRunPayroll = () => {
        setIsProcessing(true);
        setPayrollStatus('Processing');

        // Simulate processing
        setTimeout(() => {
            setIsProcessing(false);
            setPayrollStatus('Completed');
        }, 2000);
    };

    // Mock Data
    const employees = [
        { id: 1, name: 'Sunny Gautam', role: 'Product Designer', basic: 85000, allowances: 25000, deductions: 5000, net: 105000, status: 'Approved', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sunny' },
        { id: 2, name: 'Sarah Jenkins', role: 'HR Manager', basic: 90000, allowances: 20000, deductions: 6000, net: 104000, status: 'Processing', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
        { id: 3, name: 'Mike Ross', role: 'Senior Engineer', basic: 120000, allowances: 40000, deductions: 12000, net: 148000, status: 'Pending', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' },
        { id: 4, name: 'Isobel L', role: 'Intern', basic: 25000, allowances: 5000, deductions: 1000, net: 29000, status: 'Calculated', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Isobel' },
        { id: 5, name: 'Harvey Specter', role: 'VP Sales', basic: 250000, allowances: 100000, deductions: 45000, net: 305000, status: 'Approved', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Harvey' },
    ];

    const salaryDistribution = [
        { name: 'Basic Salary', value: 50, color: '#4F46E5' }, // Indigo 600
        { name: 'Allowances', value: 30, color: '#10B981' }, // Emerald 500
        { name: 'Bonuses', value: 10, color: '#F59E0B' }, // Amber 500
        { name: 'Deductions', value: 10, color: '#EF4444' }, // Red 500
    ];

    const workflowSteps = [
        { id: 1, label: 'Data Collection', status: 'completed' },
        { id: 2, label: 'Calculations', status: 'processing' },
        { id: 3, label: 'Approvals', status: 'pending' },
        { id: 4, label: 'Bank Transfer', status: 'pending' },
        { id: 5, label: 'Completion', status: 'pending' },
    ];

    const alerts = [
        { id: 1, type: 'warning', message: '5 employees have incomplete bank details', action: 'Review' },
        { id: 2, type: 'info', message: 'Tax deduction limits approaching for 3 employees', action: 'View' },
    ];

    const toggleSelectAll = () => {
        if (selectedEmployees.length === employees.length) {
            setSelectedEmployees([]);
        } else {
            setSelectedEmployees(employees.map(e => e.id));
        }
    };

    const toggleSelectOne = (id) => {
        if (selectedEmployees.includes(id)) {
            setSelectedEmployees(selectedEmployees.filter(eid => eid !== id));
        } else {
            setSelectedEmployees([...selectedEmployees, id]);
        }
    };

    const getStatusVariant = (status) => {
        switch (status) {
            case 'Paid': return 'success';
            case 'Approved': return 'success';
            case 'Processing': return 'warning';
            case 'Calculated': return 'info';
            default: return 'secondary';
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-12">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">

                {/* 1. Payroll Overview Header */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center bg-slate-100 rounded-lg p-1">
                                <button className="p-1 hover:bg-white rounded shadow-sm transition-all"><ChevronLeft className="h-5 w-5 text-slate-500" /></button>
                                <span className="px-4 font-bold text-slate-700">{currentPeriod.month} {currentPeriod.year}</span>
                                <button className="p-1 hover:bg-white rounded shadow-sm transition-all"><ChevronRight className="h-5 w-5 text-slate-500" /></button>
                            </div>
                            <Badge variant={payrollStatus === 'Completed' ? 'success' : payrollStatus === 'Processing' ? 'warning' : 'secondary'} className="px-3 py-1 font-semibold text-sm">
                                {payrollStatus}
                            </Badge>
                        </div>

                        <div className="flex gap-2 flex-wrap w-full md:w-auto">
                            <Button
                                variant="primary"
                                onClick={handleRunPayroll}
                                disabled={isProcessing || payrollStatus === 'Completed'}
                                className="flex-1 sm:flex-none justify-center"
                            >
                                <Play className={`h-4 w-4 mr-2 ${isProcessing ? 'animate-spin' : ''}`} />
                                {isProcessing ? 'Running...' : 'Run Payroll'}
                            </Button>
                            <Button variant="outline" className="flex-1 sm:flex-none justify-center"><Upload className="h-4 w-4 mr-2" /> Import Data</Button>
                            <Button variant="secondary" className="flex-1 sm:flex-none justify-center"><Download className="h-4 w-4 mr-2" /> Export</Button>
                            <Button variant="secondary" className="flex-1 sm:flex-none justify-center"><Send className="h-4 w-4 mr-2" /> To Accounting</Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                        <div className="px-4">
                            <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Total Payroll Cost</p>
                            <div className="mt-2 flex items-baseline gap-2">
                                <h2 className="text-3xl font-bold text-slate-900">$1,245,000</h2>
                                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+4.2%</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-1">Estimations based on current data</p>
                        </div>
                        <div className="px-4 pt-4 md:pt-0">
                            <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Employees Processed</p>
                            <div className="mt-2 flex items-baseline gap-2">
                                <h2 className="text-3xl font-bold text-slate-900">124 <span className="text-lg text-slate-400 font-normal">/ 128</span></h2>
                            </div>
                            <p className="text-xs text-slate-400 mt-1">4 employees joined mid-month</p>
                        </div>
                        <div className="px-4 pt-4 md:pt-0">
                            <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Pending Approvals</p>
                            <div className="mt-2 flex items-baseline gap-2">
                                <h2 className="text-3xl font-bold text-orange-600">8</h2>
                                <span className="text-xs font-medium text-slate-500">requests</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-1">Mostly overtime adjustments</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* 2. Payroll Processing Panel (Main Table) */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Timeline */}
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
                            <div className="flex items-center min-w-[600px]">
                                {workflowSteps.map((step, index) => (
                                    <div key={step.id} className="flex-1 relative">
                                        <div className="flex flex-col items-center z-10 relative">
                                            <div className={`
                                w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors
                                ${step.status === 'completed' ? 'bg-indigo-600 border-indigo-600 text-white' :
                                                    step.status === 'processing' ? 'bg-white border-indigo-600 text-indigo-600 animate-pulse' :
                                                        'bg-white border-slate-200 text-slate-300'}
                             `}>
                                                {step.status === 'completed' ? <CheckCircle className="h-4 w-4" /> : step.id}
                                            </div>
                                            <span className={`mt-2 text-xs font-medium ${step.status === 'pending' ? 'text-slate-400' : 'text-indigo-900'}`}>{step.label}</span>
                                        </div>
                                        {index !== workflowSteps.length - 1 && (
                                            <div className={`absolute top-4 left-1/2 w-full h-0.5 -z-0 ${step.status === 'completed' ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bulk Operations */}
                        {selectedEmployees.length > 0 && (
                            <div className="bg-indigo-900 text-white px-6 py-3 rounded-xl flex items-center justify-between shadow-lg animate-in slide-in-from-bottom-2 fade-in">
                                <span className="font-medium text-sm">{selectedEmployees.length} employees selected</span>
                                <div className="flex gap-3">
                                    <button className="text-xs font-medium hover:text-indigo-200 transition-colors">Adjust Salary</button>
                                    <button className="text-xs font-medium hover:text-indigo-200 transition-colors">Add Bonus</button>
                                    <div className="h-4 w-px bg-indigo-700"></div>
                                    <button className="text-xs font-bold text-white bg-indigo-700 hover:bg-indigo-600 px-3 py-1 rounded transition-colors">Approve Selected</button>
                                </div>
                            </div>
                        )}

                        {/* Table */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                <h3 className="font-bold text-slate-800">Employee List</h3>
                                <div className="flex gap-2">
                                    <Button variant="secondary" className="h-8 text-xs"><Filter className="h-3 w-3 mr-1" /> Filter</Button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-slate-100">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left">
                                                <input type="checkbox"
                                                    checked={selectedEmployees.length === employees.length}
                                                    onChange={toggleSelectAll}
                                                    className="rounded border-slate-900 text-indigo-600 focus:ring-indigo-500"
                                                />
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Employee</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Basic</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Deductions</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Net Pay</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-slate-100">
                                        {employees.map((emp) => (
                                            <tr key={emp.id} className="hover:bg-slate-50 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <input type="checkbox"
                                                        checked={selectedEmployees.includes(emp.id)}
                                                        onChange={() => toggleSelectOne(emp.id)}
                                                        className="rounded border-slate-900 text-indigo-600 focus:ring-indigo-500"
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <img src={emp.avatar} alt="" className="h-8 w-8 rounded-full bg-slate-100" />
                                                        <div className="ml-3">
                                                            <div className="text-sm font-medium text-slate-900">{emp.name}</div>
                                                            <div className="text-xs text-slate-500">{emp.role}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">
                                                    ${emp.basic.toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">
                                                    -${emp.deductions.toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900">
                                                    ${emp.net.toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <Badge variant={getStatusVariant(emp.status)}>{emp.status}</Badge>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <button className="text-slate-400 hover:text-indigo-600 p-1.5 rounded-full hover:bg-indigo-50 transition-colors">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30 flex justify-center">
                                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View All 124 Employees</button>
                            </div>
                        </div>
                    </div>


                    {/* Right Column: Widgets */}
                    <div className="space-y-6">

                        {/* 3. Salary Breakdown Widget */}
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-800 mb-4">Cost Distribution</h3>
                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={salaryDistribution}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {salaryDistribution.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend verticalAlign="bottom" height={36} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="space-y-3 mt-2">
                                {salaryDistribution.map((item) => (
                                    <div key={item.name} className="flex justify-between text-sm">
                                        <span className="text-slate-500">{item.name}</span>
                                        <span className="font-semibold text-slate-900">{item.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 5. Alerts & Quick Actions */}
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-800 mb-4">Alerts & Actions</h3>
                            <div className="space-y-3">
                                {alerts.map((alert) => (
                                    <div key={alert.id} className={`p-3 rounded-lg flex items-start gap-3 ${alert.type === 'warning' ? 'bg-amber-50 border border-amber-100' : 'bg-blue-50 border border-blue-100'}`}>
                                        <AlertCircle className={`h-5 w-5 mt-0.5 ${alert.type === 'warning' ? 'text-amber-600' : 'text-blue-600'}`} />
                                        <div className="flex-1">
                                            <p className={`text-sm ${alert.type === 'warning' ? 'text-amber-900' : 'text-blue-900'}`}>{alert.message}</p>
                                            <button className={`text-xs font-semibold mt-1 ${alert.type === 'warning' ? 'text-amber-700 hover:text-amber-800' : 'text-blue-700 hover:text-blue-800'}`}>
                                                {alert.action} →
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                                <button className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 text-left transition-colors group">
                                    <FileText className="h-5 w-5 text-indigo-600 mb-2 group-hover:scale-110 transition-transform" />
                                    <p className="text-xs font-bold text-slate-700">Salary Revision</p>
                                </button>
                                <button className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 text-left transition-colors group">
                                    <Plus className="h-5 w-5 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
                                    <p className="text-xs font-bold text-slate-700">Add Reimbursement</p>
                                </button>
                                <button className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 text-left transition-colors group">
                                    <Archive className="h-5 w-5 text-slate-600 mb-2 group-hover:scale-110 transition-transform" />
                                    <p className="text-xs font-bold text-slate-700">Compliance Report</p>
                                </button>
                                <button className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 text-left transition-colors group">
                                    <Upload className="h-5 w-5 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                                    <p className="text-xs font-bold text-slate-700">Bulk Adjust</p>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payroll;
