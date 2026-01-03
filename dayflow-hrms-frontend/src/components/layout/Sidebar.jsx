import React from 'react';
import Logo from '../common/Logo';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    CalendarCheck,
    Briefcase,
    DollarSign,
    User,
    LogOut,
    ChevronRight
} from 'lucide-react';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/employee/dashboard' },
        { icon: CalendarCheck, label: 'Attendance', path: '/employee/attendance' },
        { icon: Briefcase, label: 'Leave', path: '/employee/leave' },
        { icon: DollarSign, label: 'Payroll', path: '/employee/payroll' },
        { icon: User, label: 'My Profile', path: '/employee/profile' },
    ];

    return (
        <div className="h-screen w-64 bg-white border-r border-slate-200 flex flex-col fixed left-0 top-0 z-20 transition-all duration-300">
            {/* Branding */}
            <div className="h-16 flex items-center px-6 border-b border-slate-100">
                <Logo />
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Menu</p>

                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
              group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
              ${isActive
                                ? 'bg-primary-50 text-primary-700 shadow-sm'
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            }
            `}
                    >
                        <item.icon className="mr-3 h-5 w-5 flex-shrink-0 transition-colors duration-200" />
                        <span className="flex-1">{item.label}</span>
                        {location.pathname === item.path && (
                            <ChevronRight className="h-4 w-4 text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Footer / Logout */}
            <div className="p-4 border-t border-slate-100">
                <button
                    onClick={() => navigate('/login')}
                    className="flex w-full items-center px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                    <LogOut className="mr-3 h-5 w-5" />
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
