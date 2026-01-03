import React, { useState } from 'react';
import { Plus, Calendar, Clock, AlertCircle, CheckCircle } from 'lucide-react'; // Added CheckCircle import
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import { useLeaves } from '../../context/LeaveContext';

const Leave = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('history');
    const { requests, addRequest } = useLeaves();

    // Filter requests for current user (Mock: DF-042)
    const myRequests = requests.filter(req => req.employeeId === 'DF-042');

    // Form State
    const [formData, setFormData] = useState({
        type: 'Casual Leave',
        from: '',
        to: '',
        reason: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const calculateDays = (start, end) => {
        if (!start || !end) return 0;
        const diff = new Date(end) - new Date(start);
        return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const days = calculateDays(formData.from, formData.to);
        const requestData = {
            ...formData,
            days: days > 0 ? days : 1 // Fallback
        };
        addRequest(requestData);
        setIsModalOpen(false);
        setFormData({ type: 'Casual Leave', from: '', to: '', reason: '' });
    };

    const getStatusVariant = (status) => {
        switch (status) {
            case 'Approved': return 'success';
            case 'Pending': return 'warning';
            case 'Rejected': return 'danger';
            default: return 'secondary';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Leave Management</h1>
                    <p className="text-slate-500">Apply for leave and track your requests.</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Apply Leave
                </Button>
            </div>

            {/* Balance Cards (Static for now) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* ... Keep existing balance cards ... */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg shadow-blue-200">
                    <p className="text-blue-100 text-sm font-medium">Casual Leave</p>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-3xl font-bold">8</span>
                        <span className="text-blue-100">/ 12 days</span>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg shadow-emerald-200">
                    <p className="text-emerald-100 text-sm font-medium">Sick Leave</p>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-3xl font-bold">5</span>
                        <span className="text-emerald-100">/ 10 days</span>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg shadow-purple-200">
                    <p className="text-purple-100 text-sm font-medium">Paid Leave</p>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-3xl font-bold">12</span>
                        <span className="text-purple-100">/ 20 days</span>
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100">
                {myRequests.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">No leave requests found.</div>
                ) : (
                    myRequests.map((request) => (
                        <div key={request.id} className="p-6 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                            <div className="flex justify-between items-start">
                                <div className="flex gap-4">
                                    <div className={`p-3 rounded-full mt-1 ${request.type === 'Sick Leave' ? 'bg-red-50 text-red-600' :
                                        request.type === 'Casual Leave' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                                        }`}>
                                        <Calendar className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900">{request.type}</h4>
                                        <p className="text-xs text-slate-500 mt-1">{request.from} - {request.to} • {request.days} days</p>
                                        <p className="text-sm text-slate-600 mt-2">{request.reason}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <Badge variant={getStatusVariant(request.status)}>{request.status}</Badge>
                                    <span className="text-xs text-slate-400">Applied on {request.appliedOn}</span>
                                </div>
                            </div>
                        </div>
                    )))}
            </div>

            {/* Apply Leave Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Apply for Leave"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Leave Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            className="w-full rounded-lg border-slate-400 shadow focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option>Casual Leave</option>
                            <option>Sick Leave</option>
                            <option>Paid Leave</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input type="date" label="From Date" name="from" value={formData.from} onChange={handleInputChange} required />
                        <Input type="date" label="To Date" name="to" value={formData.to} onChange={handleInputChange} required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Reason</label>
                        <textarea
                            name="reason"
                            value={formData.reason}
                            onChange={handleInputChange}
                            rows="3"
                            className="w-full rounded-lg border-slate-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Briefly explain the reason..."
                        ></textarea>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <Button variant="ghost" onClick={(e) => { e.preventDefault(); setIsModalOpen(false); }}>Cancel</Button>
                        <Button type="submit">Submit Request</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};


export default Leave;
