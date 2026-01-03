import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Zap, ArrowRight, UserCheck } from 'lucide-react';
import Badge from '../common/Badge';

const SmartApprovalPanel = () => {
    const requests = [
        {
            id: 1,
            employee: 'Sarah Jenkins',
            type: 'Sick Leave',
            dates: 'Feb 12-14',
            reason: 'Viral Fever',
            analysis: {
                score: 95,
                factors: [
                    { label: 'Leave Balance Sufficient', status: 'pass' },
                    { label: 'Team Coverage Available', status: 'pass' },
                    { label: 'No Critical Deadlines', status: 'pass' }
                ],
                decision: 'Auto-Approved'
            }
        },
        {
            id: 2,
            employee: 'Mike Ross',
            type: 'Casual Leave',
            dates: 'Feb 20',
            reason: 'Personal',
            analysis: {
                score: 45,
                factors: [
                    { label: 'Leave Balance Sufficient', status: 'pass' },
                    { label: 'Low Team Availability', status: 'fail' }
                ],
                decision: 'Needs Review'
            }
        }
    ];

    return (
        <div className="bg-white rounded-xl shadow-lg border border-indigo-100 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4 flex justify-between items-center text-white">
                <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                        <Zap className="h-5 w-5 text-yellow-300" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Auto-Decision Engine</h3>
                        <p className="text-indigo-200 text-xs">AI-powered leave processing</p>
                    </div>
                </div>
                <Badge className="bg-white/20 text-white border-transparent">Processing Live</Badge>
            </div>

            <div className="divide-y divide-slate-100">
                {requests.map((req) => (
                    <div key={req.id} className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Request Info */}
                            <div className="md:w-1/3">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                                        {req.employee.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">{req.employee}</h4>
                                        <p className="text-xs text-slate-500">{req.type} • {req.dates}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-600 ml-13 bg-slate-50 p-2 rounded border border-slate-100">
                                    "{req.reason}"
                                </p>
                            </div>

                            {/* Arrow */}
                            <div className="hidden md:flex items-center justify-center text-slate-300">
                                <ArrowRight className="h-6 w-6" />
                            </div>

                            {/* Analysis & Decision */}
                            <div className="flex-1 bg-slate-50 rounded-xl p-4 border border-slate-100">
                                <div className="flex justify-between items-start mb-3">
                                    <h5 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                        Analysis Result
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${req.analysis.score > 80 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                            }`}>
                                            Confidence: {req.analysis.score}%
                                        </span>
                                    </h5>
                                    {req.analysis.decision === 'Auto-Approved' ? (
                                        <span className="flex items-center gap-1.5 text-green-600 font-bold text-sm bg-white px-3 py-1 rounded-lg border border-green-100 shadow-sm">
                                            <CheckCircle className="h-4 w-4" /> Auto-Approved
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1.5 text-orange-600 font-bold text-sm bg-white px-3 py-1 rounded-lg border border-orange-100 shadow-sm">
                                            <UserCheck className="h-4 w-4" /> Needs HR Review
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    {req.analysis.factors.map((factor, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-sm">
                                            {factor.status === 'pass' ? (
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                            ) : (
                                                <XCircle className="h-4 w-4 text-red-500" />
                                            )}
                                            <span className={factor.status === 'pass' ? 'text-slate-600' : 'text-slate-800 font-medium'}>
                                                {factor.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons for Review */}
                        {req.analysis.decision === 'Needs Review' && (
                            <div className="mt-4 flex justify-end gap-3 pt-4 border-t border-slate-100">
                                <button className="text-sm text-red-600 font-medium hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">Reject</button>
                                <button className="text-sm text-white bg-indigo-600 font-medium hover:bg-indigo-700 px-4 py-1.5 rounded-lg shadow-sm transition-colors">Approve Manually</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="px-6 py-3 bg-slate-50 text-center border-t border-slate-100">
                <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">View All Decision Logs</button>
            </div>
        </div>
    );
};

export default SmartApprovalPanel;
