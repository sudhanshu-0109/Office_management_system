import React from 'react';
import Badge from '../common/Badge';

const WeeklyView = () => {
    const weeklyData = [
        { date: 'Jan 30, Fri', in: '09:00 AM', out: '06:00 PM', hours: '9h 00m', status: 'Present' },
        { date: 'Jan 29, Thu', in: '08:55 AM', out: '06:10 PM', hours: '9h 15m', status: 'Present' },
        { date: 'Jan 28, Wed', in: '09:30 AM', out: '06:30 PM', hours: '9h 00m', status: 'Late' },
        { date: 'Jan 27, Tue', in: '09:00 AM', out: '05:00 PM', hours: '8h 00m', status: 'Present' },
        { date: 'Jan 26, Mon', in: '-', out: '-', hours: '-', status: 'Absent' },
    ];

    const getStatusVariant = (status) => {
        switch (status) {
            case 'Present': return 'success';
            case 'Late': return 'warning';
            case 'Absent': return 'danger';
            default: return 'secondary';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-800">Weekly Attendance</h3>
                <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">Download Report</button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-100">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Check In</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Check Out</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Work Hours</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100">
                        {weeklyData.map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{row.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{row.in}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{row.out}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{row.hours}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Badge variant={getStatusVariant(row.status)}>
                                        {row.status}
                                    </Badge>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WeeklyView;
