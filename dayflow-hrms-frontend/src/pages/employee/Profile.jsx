import React from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Calendar, Folder, FileText, Edit2 } from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

const ProfileSection = ({ title, children, onEdit }) => (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h3 className="font-bold text-slate-800">{title}</h3>
            {onEdit && (
                <button onClick={onEdit} className="text-primary-600 hover:text-primary-700 p-1.5 rounded-full hover:bg-primary-50 transition-colors">
                    <Edit2 className="h-4 w-4" />
                </button>
            )}
        </div>
        <div className="p-6">
            {children}
        </div>
    </div>
);

const DetailItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-3 mb-4 last:mb-0">
        <div className="text-slate-400">
            <Icon className="h-4 w-4" />
        </div>
        <div>
            <p className="text-xs text-slate-500 font-medium">{label}</p>
            <p className="text-sm text-slate-900 font-medium">{value}</p>
        </div>
    </div>
);

const Profile = () => {
    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Header Profile Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-primary-500 to-primary-600"></div>

                <div className="relative z-10 pt-4 md:pt-0">
                    <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sunny"
                        alt="Profile"
                        className="h-28 w-28 rounded-full border-4 border-white shadow-lg bg-white"
                    />
                </div>

                <div className="flex-1 text-center md:text-left pt-4 md:pt-12 relative z-10">
                    <h1 className="text-2xl font-bold text-slate-900">Sunny Gautam</h1>
                    <p className="text-slate-500 flex items-center justify-center md:justify-start gap-2 mt-1">
                        <Briefcase className="h-4 w-4" /> Product Designer • Design Team
                    </p>
                    <div className="mt-4 flex gap-2 justify-center md:justify-start">
                        <Badge variant="success">Active</Badge>
                        <Badge variant="secondary">Full Time</Badge>
                    </div>
                </div>

                {/* Completeness Bar */}
                <div className="w-full md:w-64 bg-slate-50 rounded-xl p-4 border border-slate-100 md:mt-12 relative z-10">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-bold text-slate-700">Profile Completion</span>
                        <span className="text-sm font-bold text-primary-600">85%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-primary-500 h-2 rounded-full transition-all duration-1000" style={{ width: '85%' }}></div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Complete your bank details to reach 100%.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Details */}
                <ProfileSection title="Personal Information" onEdit={() => { }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <DetailItem icon={Mail} label="Email Address" value="sunny.gautam@dayflow.com" />
                        <DetailItem icon={Phone} label="Phone Number" value="+91 98765 43210" />
                        <DetailItem icon={Calendar} label="Date of Birth" value="15 Aug 1995" />
                        <DetailItem icon={MapPin} label="Current Address" value="Bangalore, Karnataka" />
                    </div>
                </ProfileSection>

                {/* Job Details */}
                <ProfileSection title="Employment Details">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <DetailItem icon={User} label="Employee ID" value="DF-042" />
                        <DetailItem icon={Calendar} label="Joining Date" value="01 Jan 2024" />
                        <DetailItem icon={Briefcase} label="Department" value="Product & Design" />
                        <DetailItem icon={User} label="Reporting Manager" value="Sarah Jenkins" />
                    </div>
                </ProfileSection>
            </div>

            {/* Documents */}
            <ProfileSection title="Documents" onEdit={() => { }}>
                <div className="flex gap-4 overflow-x-auto pb-2">
                    {['Offer Letter.pdf', 'ND Agreement.pdf', 'ID Proof.jpg'].map((doc, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg min-w-[200px] hover:bg-slate-100 cursor-pointer transition-colors">
                            <div className="bg-white p-2 rounded text-red-500 border border-slate-100">
                                <FileText className="h-6 w-6" />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-medium text-slate-800 truncate">{doc}</p>
                                <p className="text-xs text-slate-500">Uploaded Jan 2024</p>
                            </div>
                        </div>
                    ))}
                </div>
            </ProfileSection>
        </div>
    );
};

export default Profile;
