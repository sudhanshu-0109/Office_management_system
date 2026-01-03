import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Bell, LogOut, User, Calendar, DollarSign, PieChart, Users, Menu } from 'lucide-react';
import Button from '../common/Button';
import Logo from '../common/Logo';

import { useAttendance } from '../../context/AttendanceContext';

const AdminNavbar = () => {
    const navigate = useNavigate();
    const { isCheckedIn, handleCheckIn, handleCheckOut } = useAttendance();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const navItems = [
        { name: 'Employees', path: '/admin/employees', icon: Users },
        { name: 'Attendance', path: '/admin/attendance', icon: ClockIcon },
        { name: 'Time Off', path: '/admin/leaves', icon: Calendar },
        { name: 'Payroll', path: '/admin/payroll', icon: DollarSign },
        { name: 'Reports', path: '/admin/reports', icon: PieChart },
    ];

    function ClockIcon({ className }) {
        return (
            <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
        )
    }

    const handleLogout = () => {
        // Clear auth state if any (mock)
        navigate('/login');
    };

    const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo & Nav */}
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/admin/dashboard')}>
                            <Logo />
                            <span className="ml-2 px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-500 border border-slate-200">ADMIN</span>
                        </div>

                        {/* Desktop Nav */}
                        <div className="hidden md:ml-8 md:flex md:space-x-1">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.path}
                                    className={({ isActive }) => `
                    inline-flex items-center px-4 pt-1 border-b-2 text-sm font-medium transition-colors h-full
                    ${isActive
                                            ? 'border-indigo-500 text-indigo-600'
                                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}
                  `}
                                >
                                    <item.icon className="h-4 w-4 mr-2" />
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    {/* Right User Utils */}
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex">
                            <Button
                                variant={isCheckedIn ? "outline" : "primary"}
                                onClick={isCheckedIn ? handleCheckOut : handleCheckIn}
                                className={isCheckedIn ? "border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300" : ""}
                            >
                                <ClockIcon className="h-4 w-4 mr-2" />
                                {isCheckedIn ? 'Check Out' : 'Check In'}
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <Menu className="h-6 w-6" />
                        </button>

                        <button className="p-2 text-slate-400 hover:text-slate-600 relative hidden md:block">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
                        </button>

                        <div className="h-8 w-px bg-slate-200 mx-1 hidden md:block"></div>

                        {/* Profile Dropdown */}
                        <div className="relative hidden md:block">
                            <div
                                className="flex items-center gap-3 cursor-pointer"
                                onClick={toggleProfile}
                            >
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-bold text-slate-900 leading-none">Admin User</p>
                                    <p className="text-xs text-slate-500 mt-1">Super Admin</p>
                                </div>
                                <img
                                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
                                    alt="Admin"
                                    className={`h-9 w-9 rounded-full bg-slate-100 border border-slate-200 transition-shadow ${isProfileOpen ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}`}
                                />
                            </div>

                            {/* Click Outside Backdrop */}
                            {isProfileOpen && (
                                <div
                                    className="fixed inset-0 z-10 cursor-default"
                                    onClick={() => setIsProfileOpen(false)}
                                />
                            )}

                            {/* Dropdown Menu */}
                            {isProfileOpen && (
                                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-20 animate-in fade-in zoom-in-95 duration-100">
                                    <div className="px-4 py-2 border-b border-slate-50">
                                        <p className="text-sm font-medium text-slate-900">Admin Account</p>
                                        <p className="text-xs text-slate-500 truncate">admin@dayflow.com</p>
                                    </div>
                                    <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center">
                                        <User className="h-4 w-4 mr-2" /> My Profile
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                                    >
                                        <LogOut className="h-4 w-4 mr-2" /> Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-slate-200 bg-white">
                    <div className="pt-2 pb-3 space-y-1">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) => `
                                    block pl-3 pr-4 py-2 border-l-4 text-base font-medium
                                    ${isActive
                                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                                        : 'border-transparent text-slate-500 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700'}
                                `}
                            >
                                <div className="flex items-center">
                                    <item.icon className="h-4 w-4 mr-3" />
                                    {item.name}
                                </div>
                            </NavLink>
                        ))}
                    </div>
                    <div className="pt-4 pb-4 border-t border-slate-200">
                        <div className="flex items-center px-4">
                            <div className="flex-shrink-0">
                                <img
                                    className="h-10 w-10 rounded-full"
                                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
                                    alt=""
                                />
                            </div>
                            <div className="ml-3">
                                <div className="text-base font-medium text-slate-800">Admin User</div>
                                <div className="text-sm font-medium text-slate-500">admin@dayflow.com</div>
                            </div>
                        </div>
                        <div className="mt-3 space-y-1">
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-base font-medium text-red-600 hover:bg-red-50"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default AdminNavbar;
