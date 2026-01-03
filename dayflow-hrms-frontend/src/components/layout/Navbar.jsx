import React from 'react';
import { Bell, Search, Menu, Clock } from 'lucide-react';
import Button from '../common/Button';
import { useAttendance } from '../../context/AttendanceContext';

const Navbar = ({ onMenuClick }) => {
    const { isCheckedIn, handleCheckIn, handleCheckOut } = useAttendance();

    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
            {/* Left items */}
            <div className="flex items-center">
                <button
                    onClick={onMenuClick}
                    className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 mr-2"
                >
                    <Menu className="h-6 w-6" />
                </button>

                {/* Search Bar - hidden on mobile */}
                <div className="hidden md:flex items-center relative w-64">
                    <Search className="absolute left-3 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-9 pr-4 py-2 w-full text-sm bg-slate-50 border border-slate-900 rounded-full focus:ring-2 focus:ring-primary-100 focus:bg-white transition-all placeholder:text-slate-400"
                    />
                </div>
            </div>

            {/* Right items */}
            <div className="flex items-center space-x-2 md:space-x-4">
                <Button
                    variant={isCheckedIn ? "outline" : "primary"}
                    onClick={isCheckedIn ? handleCheckOut : handleCheckIn}
                    className={isCheckedIn ? "border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 hidden md:flex" : "hidden md:flex"}
                >
                    <Clock className="h-4 w-4 mr-2" />
                    {isCheckedIn ? 'Check Out' : 'Check In'}
                </Button>
                <button className="relative p-2 rounded-full text-slate-500 hover:bg-slate-100 transition-colors">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-8 w-px bg-slate-200 mx-2"></div>

                <div className="flex items-center gap-3 cursor-pointer p-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-semibold text-slate-800 leading-none">Sunny G.</p>
                        <p className="text-xs text-slate-500 mt-1">Product Designer</p>
                    </div>
                    <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sunny"
                        alt="Avatar"
                        className="h-9 w-9 rounded-full bg-primary-100 border border-primary-200"
                    />
                </div>
            </div>
        </header>
    );
};

export default Navbar;
