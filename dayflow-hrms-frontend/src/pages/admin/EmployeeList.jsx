import React, { useState } from 'react';
import { Search, Filter, Plus, MoreVertical, Mail, Phone, MapPin, Briefcase, Plane } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal'; // Import Modal
import Input from '../../components/common/Input';
import { useEmployees } from '../../context/EmployeeContext';

const EmployeeGrid = () => {
    const navigate = useNavigate();
    const { employees, addEmployee } = useEmployees();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        role: '',
        dept: '',
        type: 'Permanent',
        location: 'On-site',
        email: '',
        phone: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            first_name: formData.firstName,
            last_name: formData.lastName,
            department_val: formData.dept,
            designation_val: formData.role,
            password: 'password123'
        };

        const result = await addEmployee(payload);

        if (result.success) {
            setIsAddModalOpen(false);
            alert(`Employee Added Successfully!\n\nEmail: ${formData.email}\nDefault Password: password123\n\nPlease share these credentials with the employee.`);

            setFormData({ firstName: '', lastName: '', role: '', dept: '', type: 'Permanent', location: 'On-site', email: '', phone: '' });
        } else {
            alert(`Failed to add employee:\n${result.message}`);
        }
    };

    const getAttendanceIndicator = (status) => {
        const colors = {
            present: 'bg-green-500',
            wfh: 'bg-blue-500',
            absent: 'bg-red-500',
            'half-day': 'bg-yellow-500',
            leave: 'bg-purple-500',
        };
        return colors[status] || 'bg-slate-300';
    };

    const getAttendanceLabel = (status) => {
        const labels = {
            present: 'Present',
            wfh: 'WFH',
            absent: 'Absent',
            'half-day': 'Half Day',
            leave: 'On Leave',
        };
        return labels[status] || 'Unknown';
    };

    return (
        <div className="min-h-screen bg-slate-50">

            <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
                {/* Header & Controls */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Employees</h1>
                        <p className="text-slate-500">Manage access, details, and permissions.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search employees..."
                                className="pl-9 pr-4 py-2 w-full rounded-lg border-slate-900 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>
                        <div className="flex gap-3">
                            <Button variant="secondary" className="flex-1 sm:flex-none justify-center">
                                <Filter className="h-4 w-4 mr-2" /> Filter
                            </Button>
                            <Button onClick={() => setIsAddModalOpen(true)} className="flex-1 sm:flex-none justify-center">
                                <Plus className="h-4 w-4 mr-2" /> Add New
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Total Stock', val: '142', color: 'text-slate-900' },
                        { label: 'Present Today', val: '118', color: 'text-green-600' },
                        { label: 'On Leave', val: '12', color: 'text-purple-600' },
                        { label: 'Remote', val: '8', color: 'text-blue-600' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                            <p className="text-slate-500 text-xs font-semibold uppercase">{stat.label}</p>
                            <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.val}</p>
                        </div>
                    ))}
                </div>

                {/* Employee Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {employees.map((emp) => (
                        <div
                            key={emp.id}
                            onClick={() => navigate(`/admin/employees/${emp.id}`)}
                            className="group bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-primary-200 transition-all cursor-pointer relative overflow-hidden"
                        >
                            {/* Top Banner with Actions */}
                            <div className="h-20 bg-gradient-to-r from-slate-50 to-slate-100 p-4 flex justify-between items-start relative">
                                <div className="flex gap-2">
                                    <Badge variant={emp.status === 'active' ? 'success' : 'secondary'} className="bg-white/80 backdrop-blur shadow-sm">
                                        {emp.status}
                                    </Badge>
                                </div>

                                <div className="flex items-center gap-2">
                                    {/* Status Indicator */}
                                    <div className="bg-white/80 backdrop-blur p-1.5 rounded-full shadow-sm" title={`Status: ${emp.attendance || 'Absent'}`}>
                                        {emp.attendance === 'present' ? (
                                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                        ) : emp.attendance === 'leave' ? (
                                            <Plane className="h-4 w-4 text-blue-500" />
                                        ) : (
                                            <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                                        )}
                                    </div>

                                    <button className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-white/50 transition-colors">
                                        <MoreVertical className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Profile Info */}
                            <div className="px-6 pb-6 relative">
                                <div className="relative -mt-10 mb-4 inline-block">
                                    <img
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${emp.user?.first_name || emp.first_name || 'User'}`}
                                        alt={emp.user?.first_name}
                                        className="h-20 w-20 rounded-full border-4 border-white shadow-md bg-white object-cover"
                                    />
                                </div>

                                <div className="mb-4">
                                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-primary-600 transition-colors">
                                        {emp.user?.first_name} {emp.user?.last_name}
                                    </h3>
                                    <p className="text-slate-500 text-sm">{emp.designation_title || emp.role}</p>
                                    <p className="text-primary-600 text-xs font-medium mt-1 uppercase tracking-wide">{emp.department_name || emp.dept}</p>
                                </div>

                                <div className="space-y-2.5">
                                    <div className="flex items-center text-sm text-slate-600 gap-3">
                                        <MapPin className="h-4 w-4 text-slate-400" />
                                        {emp.location}
                                    </div>
                                    <div className="flex items-center text-sm text-slate-600 gap-3">
                                        <Briefcase className="h-4 w-4 text-slate-400" />
                                        {emp.employment_type || emp.type}
                                    </div>
                                </div>

                                {/* Hover Action (Desktop) */}
                                <div className="absolute inset-x-0 bottom-0 p-4 bg-white border-t border-slate-100 translate-y-full group-hover:translate-y-0 transition-transform duration-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                                    <Button fullWidth size="sm">Manage Profile</Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Add Employee Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Add New Employee"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                        />
                        <Input
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Job Role"
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            placeholder="e.g. Product Designer"
                            required
                        />
                        <Input
                            label="Department"
                            name="dept"
                            value={formData.dept}
                            onChange={handleInputChange}
                            required
                        />
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Employment Type</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleInputChange}
                                className="w-full rounded-lg border-slate-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option>Permanent</option>
                                <option>Contract</option>
                                <option>Internship</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        <Input
                            label="Phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Work Location</label>
                        <select
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="w-full rounded-lg border-slate-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option>On-site</option>
                            <option>Remote</option>
                            <option>Hybrid</option>
                        </select>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <Button variant="ghost" onClick={(e) => { e.preventDefault(); setIsAddModalOpen(false); }}>Cancel</Button>
                        <Button type="submit">Add Employee</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default EmployeeGrid;
