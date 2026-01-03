import React, { useState } from 'react';
import { DollarSign, Download, CreditCard, PieChart } from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';

const Payroll = () => {
    const [showSlip, setShowSlip] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(null);

    const payslips = [
        { id: 1, month: 'January 2026', amount: '$4,250', status: 'Paid', date: 'Jan 31, 2026' },
        { id: 2, month: 'December 2025', amount: '$4,250', status: 'Paid', date: 'Dec 31, 2025' },
        { id: 3, month: 'November 2025', amount: '$4,100', status: 'Paid', date: 'Nov 30, 2025' },
    ];

    const handleDownload = (month) => {
        setSelectedMonth(month);
        setShowSlip(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">My Payroll</h1>
                    <p className="text-slate-500">View your salary details and download payslips.</p>
                </div>
                <Button variant="outline">
                    <PieChart className="h-4 w-4 mr-2" />
                    Tax Projection
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Salary Structure Card */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <CreditCard className="h-5 w-5 text-primary-600" />
                            Current Salary Structure
                        </h3>
                        <Badge variant="success">Effective Jan 2026</Badge>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            <div className="space-y-4">
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Earnings</p>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-600">Basic Salary</span>
                                    <span className="font-medium text-slate-900">$2,500.00</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-600">HRA</span>
                                    <span className="font-medium text-slate-900">$1,000.00</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-600">Special Allowance</span>
                                    <span className="font-medium text-slate-900">$1,200.00</span>
                                </div>
                                <div className="border-t border-slate-100 pt-2 flex justify-between font-bold text-slate-900">
                                    <span>Gross Earnings</span>
                                    <span>$4,700.00</span>
                                </div>
                            </div>

                            <div className="space-y-4 mt-6 md:mt-0">
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Deductions</p>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-600">Provident Fund</span>
                                    <span className="font-medium text-slate-900">$300.00</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-600">Tax (TDS)</span>
                                    <span className="font-medium text-slate-900">$150.00</span>
                                </div>
                                <div className="border-t border-slate-100 pt-2 flex justify-between font-bold text-slate-900">
                                    <span>Total Deductions</span>
                                    <span>$450.00</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 bg-primary-50 rounded-xl p-4 flex justify-between items-center">
                            <div>
                                <p className="text-sm text-primary-700 font-medium">Net Salary (In Hand)</p>
                                <p className="text-xs text-primary-500">Credited to **** 1234</p>
                            </div>
                            <p className="text-2xl font-bold text-primary-700">$4,250.00</p>
                        </div>
                    </div>
                </div>

                {/* Payslips List */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-100">
                    <div className="px-6 py-4 border-b border-slate-100">
                        <h3 className="font-bold text-slate-800">Recent Payslips</h3>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {payslips.map((slip) => (
                            <div key={slip.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="bg-slate-100 p-2 rounded-lg text-slate-500">
                                        <DollarSign className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">{slip.month}</p>
                                        <p className="text-xs text-slate-500">Paid on {slip.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-medium text-slate-900">{slip.amount}</span>
                                    <button
                                        onClick={() => handleDownload(slip.month)}
                                        className="text-primary-600 hover:text-primary-700 p-1 rounded hover:bg-primary-50"
                                    >
                                        <Download className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 border-t border-slate-100 text-center">
                        <button className="text-sm text-primary-600 font-medium hover:text-primary-700">View All History</button>
                    </div>
                </div>
            </div>

            {/* Slip Modal */}
            <Modal
                isOpen={showSlip}
                onClose={() => setShowSlip(false)}
                title={`Payslip - ${selectedMonth}`}
            >
                <div className="text-center py-8">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Download className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Downloading Payslip...</h3>
                    <p className="text-slate-500 text-sm">Your payslip for {selectedMonth} is being generated.</p>
                </div>
                <div className="flex justify-center pb-4">
                    <Button onClick={() => setShowSlip(false)}>Close</Button>
                </div>
            </Modal>
        </div>
    );
};

export default Payroll;
