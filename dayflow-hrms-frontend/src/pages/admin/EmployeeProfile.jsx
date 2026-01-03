import React, { useState } from 'react';
import {
    User, Mail, Phone, Calendar, Briefcase, MapPin,
    Save, RotateCcw, Upload, Shield, FileText, DollarSign,
    ChevronRight, ArrowLeft
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const Section = ({ title, children, editable = false }) => (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-6 shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">{title}</h3>
            {editable && <span className="text-xs text-indigo-600 font-medium bg-indigo-50 px-2 py-1 rounded">Editable</span>}
        </div>
        <div className="p-6">
            {children}
        </div>
    </div>
);

const AdminEmployeeProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('personal');

    // Wage Configuration State (For Salary Tab)
    const [wageConfig, setWageConfig] = useState({
        wageType: 'Fixed Monthly',
        monthlyWage: 50000,
        basicPercent: 50,
        hraPercent: 50, // of Basic
    });

    // Derived Calculations
    const basicSalary = wageConfig.monthlyWage * (wageConfig.basicPercent / 100);
    const hra = basicSalary * (wageConfig.hraPercent / 100);
    const specialAllowance = wageConfig.monthlyWage - (basicSalary + hra); // Simple logic for demo

    return (
        <div className="min-h-screen bg-slate-50 pb-20">

            {/* Breadcrumbs & Header */}
            <div className="bg-white border-b border-slate-200 md:sticky md:top-16 z-10">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                        <span className="cursor-pointer hover:text-slate-800" onClick={() => navigate('/admin/employees')}>Employees</span>
                        <ChevronRight className="h-4 w-4" />
                        <span className="font-medium text-slate-900">Sunny Gautam</span>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex items-center gap-4">
                            <button onClick={() => navigate('/admin/employees')} className="p-2 hover:bg-slate-100 rounded-lg md:hidden">
                                <ArrowLeft className="h-6 w-6" />
                            </button>
                            <img
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sunny"
                                alt="Avatar"
                                className="h-16 w-16 rounded-full bg-slate-100 border-2 border-white shadow-md"
                            />
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">Sunny Gautam</h1>
                                <div className="flex items-center gap-3 text-sm text-slate-500">
                                    <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" /> Product Designer</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Bangalore</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button variant="outline" size="sm">
                                <RotateCcw className="h-4 w-4 mr-2" /> Reset
                            </Button>
                            <Button size="sm">
                                <Save className="h-4 w-4 mr-2" /> Save Changes
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 mt-2">
                    <div className="flex space-x-1 overflow-x-auto no-scrollbar">
                        {[
                            { id: 'personal', label: 'Personal Details', icon: User },
                            { id: 'employment', label: 'Employment', icon: Briefcase },
                            { id: 'salary', label: 'Salary Info', icon: DollarSign },
                            { id: 'documents', label: 'Documents', icon: FileText },
                            { id: 'permissions', label: 'Permissions', icon: Shield },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                    flex items-center px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors
                    ${activeTab === tab.id
                                        ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50'
                                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}
                  `}
                            >
                                <tab.icon className={`h-4 w-4 mr-2 ${activeTab === tab.id ? 'text-indigo-600' : 'text-slate-400'}`} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">

                {/* Personal Details Tab */}
                {activeTab === 'personal' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Panel - Core Info */}
                        <div className="space-y-6">
                            <Section title="Identity" editable>
                                <div className="flex flex-col items-center mb-6">
                                    <div className="relative group cursor-pointer">
                                        <img
                                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sunny"
                                            alt="Upload View"
                                            className="h-32 w-32 rounded-full border-4 border-slate-100"
                                        />
                                        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Upload className="h-8 w-8 text-white" />
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-2">Click to replace photo</p>
                                </div>
                                <div className="space-y-4">
                                    <Input label="First Name" defaultValue="Sunny" />
                                    <Input label="Last Name" defaultValue="Gautam" />
                                    <Input label="Employee ID" defaultValue="DF-042" disabled className="bg-slate-50" />
                                </div>
                            </Section>
                        </div>

                        {/* Right Panel - Extended Info */}
                        <div className="lg:col-span-2 space-y-6">
                            <Section title="Contact Information" editable>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input label="Work Email" icon={Mail} defaultValue="sunny.gautam@dayflow.com" />
                                    <Input label="Personal Email" icon={Mail} defaultValue="sunny@gmail.com" />
                                    <Input label="Mobile Number" icon={Phone} defaultValue="+91 98765 43210" />
                                    <Input label="Emergency Contact" icon={Phone} placeholder="Relation & Number" />
                                </div>
                            </Section>

                            <Section title="Demographics" editable>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input label="Date of Birth" type="date" defaultValue="1995-08-15" />
                                    <Input label="Nationality" defaultValue="Indian" />
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Residential Address</label>
                                        <textarea className="w-full rounded-lg border-slate-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" rows="3"></textarea>
                                    </div>
                                </div>
                            </Section>
                        </div>
                    </div>
                )}

                {/* Salary Info Tab - As per Wireframe */}
                {activeTab === 'salary' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Wage Configuration Panel */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-xl p-6 shadow-xl">
                                <h3 className="flex items-center gap-2 font-bold mb-6">
                                    <DollarSign className="h-5 w-5 text-green-400" />
                                    Wage Configuration
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs text-slate-400 font-medium uppercase tracking-wider">Wage Type</label>
                                        <select className="w-full mt-1 bg-slate-700/50 border-slate-600 rounded-lg text-sm text-white focus:ring-indigo-500 focus:border-indigo-500">
                                            <option>Fixed Monthly</option>
                                            <option>Hourly</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="text-xs text-slate-400 font-medium uppercase tracking-wider">Define Monthly Wage</label>
                                        <div className="relative mt-1">
                                            <span className="absolute left-3 top-2 text-slate-400">₹</span>
                                            <input
                                                type="number"
                                                value={wageConfig.monthlyWage}
                                                onChange={(e) => setWageConfig({ ...wageConfig, monthlyWage: parseInt(e.target.value) || 0 })}
                                                className="w-full pl-8 bg-slate-700/50 border-slate-600 rounded-lg text-white font-mono font-bold focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-slate-700">
                                        <p className="text-xs text-slate-400 mb-2">Annual CTC Projection</p>
                                        <p className="text-2xl font-bold text-white font-mono">₹ {(wageConfig.monthlyWage * 12).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>

                            <Section title="Settings">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm text-slate-600">Basic Salary %</label>
                                        <input
                                            type="range" min="30" max="60"
                                            value={wageConfig.basicPercent}
                                            onChange={(e) => setWageConfig({ ...wageConfig, basicPercent: parseInt(e.target.value) })}
                                            className="w-full accent-indigo-600"
                                        />
                                        <div className="flex justify-between text-xs text-slate-500">
                                            <span>30%</span>
                                            <span className="font-bold text-indigo-600">{wageConfig.basicPercent}%</span>
                                            <span>60%</span>
                                        </div>
                                    </div>
                                </div>
                            </Section>
                        </div>

                        {/* Salary Structure Builder */}
                        <div className="lg:col-span-2">
                            <Section title="Salary Components Structure">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-sm">
                                        <thead className="bg-slate-50 border-b border-slate-200">
                                            <tr>
                                                <th className="text-left py-3 px-4 font-semibold text-slate-600">Component</th>
                                                <th className="text-left py-3 px-4 font-semibold text-slate-600">Calculation Logic</th>
                                                <th className="text-right py-3 px-4 font-semibold text-slate-600">Monthly Amount</th>
                                                <th className="text-right py-3 px-4 font-semibold text-slate-600">Yearly</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            <tr>
                                                <td className="py-3 px-4 font-medium text-slate-900">Basic Salary</td>
                                                <td className="py-3 px-4 text-slate-500">{wageConfig.basicPercent}% of Wage</td>
                                                <td className="py-3 px-4 text-right font-mono">₹ {basicSalary.toLocaleString()}</td>
                                                <td className="py-3 px-4 text-right font-mono text-slate-500">₹ {(basicSalary * 12).toLocaleString()}</td>
                                            </tr>
                                            <tr>
                                                <td className="py-3 px-4 font-medium text-slate-900">House Rent Allowance (HRA)</td>
                                                <td className="py-3 px-4 text-slate-500">50% of Basic</td>
                                                <td className="py-3 px-4 text-right font-mono">₹ {hra.toLocaleString()}</td>
                                                <td className="py-3 px-4 text-right font-mono text-slate-500">₹ {(hra * 12).toLocaleString()}</td>
                                            </tr>
                                            <tr>
                                                <td className="py-3 px-4 font-medium text-slate-900">Special Allowance</td>
                                                <td className="py-3 px-4 text-slate-500">Residual Amount</td>
                                                <td className="py-3 px-4 text-right font-mono">₹ {specialAllowance.toLocaleString()}</td>
                                                <td className="py-3 px-4 text-right font-mono text-slate-500">₹ {(specialAllowance * 12).toLocaleString()}</td>
                                            </tr>
                                            <tr className="bg-indigo-50/30">
                                                <td className="py-4 px-4 font-bold text-indigo-900">Gross Salary</td>
                                                <td></td>
                                                <td className="py-4 px-4 text-right font-bold text-indigo-700 font-mono">₹ {wageConfig.monthlyWage.toLocaleString()}</td>
                                                <td className="py-4 px-4 text-right font-bold text-indigo-700 font-mono">₹ {(wageConfig.monthlyWage * 12).toLocaleString()}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Section>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Section title="Deductions (PF & Tax)">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-slate-600">Provident Fund (12%)</span>
                                            <span className="text-sm font-mono text-slate-900">₹ {(basicSalary * 0.12).toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-slate-600">Professional Tax</span>
                                            <span className="text-sm font-mono text-slate-900">₹ 200</span>
                                        </div>
                                    </div>
                                </Section>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default AdminEmployeeProfile;
