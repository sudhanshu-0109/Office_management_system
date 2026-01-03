import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../components/layout/AdminNavbar';

const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <AdminNavbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
