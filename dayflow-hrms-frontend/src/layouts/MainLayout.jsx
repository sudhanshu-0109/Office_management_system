import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';

const MainLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Sidebar - Desktop */}
            <div className="hidden md:block">
                <Sidebar />
            </div>

            {/* Sidebar - Mobile (Drawer) */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
                        onClick={() => setSidebarOpen(false)}
                    ></div>

                    {/* Drawer */}
                    <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl transform transition-transform animate-in slide-in-from-left duration-200">
                        <Sidebar />
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="md:ml-64 min-h-screen flex flex-col">
                <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
