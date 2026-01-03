import React from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import WeeklyView from '../../components/attendance/WeeklyView';
import { useAttendance } from '../../context/AttendanceContext';

const StatCard = ({ label, value, subtext, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-slate-500">{label}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">{value}</h3>
                <p className={`text-xs mt-1 ${color}`}>{subtext}</p>
            </div>
            <div className={`p-3 rounded-lg ${color.replace('text-', 'bg-').replace('600', '50').replace('500', '50')}`}>
                <Icon className={`h-6 w-6 ${color}`} />
            </div>
        </div>
    </div>
);

const Attendance = () => {
    const { isCheckedIn } = useAttendance();
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Attendance</h1>
                    <p className="text-slate-500">Track your daily work hours and status.</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 bg-white px-4 py-2 rounded-lg border border-slate-200 w-full sm:w-auto justify-center sm:justify-start">
                    <CalendarIcon className="h-4 w-4" />
                    <span>January 2026</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard
                    label="Current Status"
                    value={isCheckedIn ? "Checked In" : "Checked Out"}
                    subtext={isCheckedIn ? "Session Active" : "Not working"}
                    icon={Clock}
                    color={isCheckedIn ? "text-green-600" : "text-slate-500"}
                />
                <StatCard
                    label="Present Days"
                    value="22"
                    subtext="Out of 26 working days"
                    icon={CheckCircle}
                    color="text-green-600"
                />
                <StatCard
                    label="Late Arrivals"
                    value="3"
                    subtext="Please improve timing"
                    icon={AlertTriangle}
                    color="text-orange-500"
                />
                <StatCard
                    label="Leaves Taken"
                    value="1"
                    subtext="Sick Leave"
                    icon={CalendarIcon}
                    color="text-purple-600"
                />
            </div>

            {/* Weekly Table */}
            <WeeklyView />
        </div>
    );
};

export default Attendance;
