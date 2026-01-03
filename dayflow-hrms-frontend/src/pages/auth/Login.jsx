import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Briefcase } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Logo from '../../components/common/Logo';
import { useEmployees } from '../../context/EmployeeContext';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState('employee');
    const [formData, setFormData] = useState({ email: '', password: '' });

    const { login } = useEmployees();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await login(formData.email, formData.password, role);
            setLoading(false);

            if (result.success) {
                if (role === 'admin') {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/employee/dashboard');
                }
            } else {
                setError(result.message);
            }
        } catch (err) {
            setLoading(false);
            setError("An unexpected error occurred.");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
            {/* Left Side - Brand & Aesthetic */}
            <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-primary-600 to-primary-900 text-white p-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="relative z-10 text-center flex flex-col items-center">
                    <div className="mb-6 flex justify-center">
                        <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                            <Logo className="h-16 w-16 text-white" textClassName="text-4xl text-white" />
                        </div>
                    </div>
                    <p className="text-xl text-primary-100 max-w-md mx-auto leading-relaxed mt-4">
                        Every Workday, Perfectly Aligned. Experience the future of HR management.
                    </p>
                </div>

                {/* Abstract shapes */}
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-white md:bg-transparent">
                <div className="w-full max-w-md bg-white md:p-10 md:rounded-2xl md:shadow-xl">
                    <div className="text-center mb-8 md:hidden flex justify-center">
                        <Logo />
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
                        <p className="text-slate-500 mt-2">Please sign in to your account.</p>
                        {error && (
                            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg flex items-center">
                                <span className="mr-2">⚠️</span> {error}
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Role Selector */}
                        <div className="flex bg-slate-100 p-1 rounded-lg mb-6">
                            <button
                                type="button"
                                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${role === 'employee' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                onClick={() => setRole('employee')}
                            >
                                Employee
                            </button>
                            <button
                                type="button"
                                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${role === 'admin' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                onClick={() => setRole('admin')}
                            >
                                Admin HR
                            </button>
                        </div>

                        <Input
                            label="Login ID / Email"
                            type="text"
                            placeholder="OIJODO20220001 or you@company.com"
                            icon={Mail}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />

                        <div className="space-y-1">
                            <Input
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                icon={Lock}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                            <div className="flex justify-end">
                                <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            fullWidth
                            size="lg"
                            isLoading={loading}
                        >
                            Sign In
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-slate-500">
                        {role === 'admin' ? (
                            <>
                                Don't have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => navigate('/signup')}
                                    className="font-medium text-primary-600 hover:text-primary-500"
                                >
                                    Sign Up
                                </button>
                            </>
                        ) : (
                            <>
                                Don't have an account?{' '}
                                <a href="mailto:?subject=Dayflow%20Account%20Request" className="font-medium text-primary-600 hover:text-primary-500">
                                    Contact HR
                                </a>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
