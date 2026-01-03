import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Building, Phone, Upload, ArrowRight, X } from 'lucide-react';


import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Logo from '../../components/common/Logo';

import { authService } from '../../services/api';

const SignUp = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        companyName: '',
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const [logo, setLogo] = useState(null);
    const fileInputRef = React.useRef(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setLogo(e.target.files[0]);
        }
    };

    const handleRemoveLogo = (e) => {
        e.stopPropagation();
        setLogo(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        const [firstName, ...lastNameParts] = formData.name.split(' ');
        const lastName = lastNameParts.join(' ');

        // Use FormData for file upload
        const data = new FormData();
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('first_name', firstName);
        data.append('last_name', lastName || '');
        data.append('role', 'hr');
        data.append('username', formData.email);
        data.append('company_name', formData.companyName);
        if (logo) {
            data.append('logo', logo);
        }

        authService.register(data)
            .then(() => {
                setLoading(false);
                navigate('/login', { state: { message: 'Account created! Please sign in.' } });
            })
            .catch((err) => {
                setLoading(false);
                console.error("Registration error:", err);
                const errorMessage = err.response?.data?.email
                    ? `Email: ${err.response.data.email[0]}`
                    : (err.response?.data?.detail || 'Registration failed. Please try again.');
                setError(errorMessage);
            });
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
            {/* Left Side - Brand & Aesthetic (Same as Login for consistency) */}
            <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-primary-600 to-primary-900 text-white p-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="relative z-10 text-center flex flex-col items-center">
                    <div className="mb-6 flex justify-center">
                        <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                            <Logo className="h-16 w-16 text-white" textClassName="text-4xl text-white" />
                        </div>
                    </div>
                    <p className="text-xl text-primary-100 max-w-md mx-auto leading-relaxed mt-4">
                        Join Dayflow today. streamline your HR management and align every workday perfectly.
                    </p>
                </div>

                {/* Abstract shapes */}
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-white md:bg-transparent overflow-y-auto">
                <div className="w-full max-w-md bg-white md:p-10 md:rounded-2xl md:shadow-xl my-8">
                    <div className="text-center mb-8 md:hidden flex justify-center">
                        <Logo />
                    </div>

                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-slate-900">Admin HR Registration</h2>
                        <p className="text-slate-500 mt-2">Create your company's HR admin account.</p>
                        <div className="mt-3 p-3 bg-blue-50 text-blue-700 text-xs rounded-lg">
                            Note: This form is for Company Admins only. Employees must contact their HR for login credentials.
                        </div>
                        {error && (
                            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg flex items-center">
                                <span className="mr-2">⚠️</span> {error}
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex gap-2 items-end">
                            <div className="flex-1">
                                <Input
                                    label="Company Name"
                                    name="companyName"
                                    placeholder="Acme Inc."
                                    icon={Building}
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-1">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        className={`p-3 rounded-lg transition-colors flex items-center gap-2 ${logo ? 'bg-primary-50 text-primary-700 border border-primary-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'} whitespace-nowrap`}
                                        title={logo ? "Change Logo" : "Upload Logo"}
                                        onClick={() => fileInputRef.current.click()}
                                    >
                                        <Upload size={20} />
                                        <span className="text-sm max-w-[100px] truncate">{logo ? logo.name : "Upload Logo"}</span>
                                    </button>
                                    {logo && (
                                        <button
                                            type="button"
                                            onClick={handleRemoveLogo}
                                            className="p-3 rounded-lg bg-red-50 text-red-500 border border-red-100 hover:bg-red-100 transition-colors"
                                            title="Remove Logo"
                                        >
                                            <X size={20} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <Input
                            label="Full Name"
                            name="name"
                            placeholder="John Doe"
                            icon={User}
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            label="Email Address"
                            type="email"
                            name="email"
                            placeholder="you@company.com"
                            icon={Mail}
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            label="Phone Number"
                            type="tel"
                            name="phone"
                            placeholder="+1 (555) 000-0000"
                            icon={Phone}
                            value={formData.phone}
                            onChange={handleChange}
                        />

                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            icon={Lock}
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            placeholder="••••••••"
                            icon={Lock}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />

                        <div className="pt-2">
                            <Button
                                type="submit"
                                fullWidth
                                size="lg"
                                isLoading={loading}
                            >
                                Sign Up
                            </Button>
                        </div>
                    </form>

                    <div className="mt-6 text-center text-sm text-slate-500">
                        Already have an account?{' '}
                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                            className="font-medium text-primary-600 hover:text-primary-500"
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
