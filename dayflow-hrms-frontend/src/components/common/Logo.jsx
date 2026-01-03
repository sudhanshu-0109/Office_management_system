import React from 'react';
import { Briefcase } from 'lucide-react';

const Logo = ({ className = "h-6 w-6", textClassName = "text-xl" }) => {
    // To use an image logo, uncomment the line below and remove the Briefcase icon
    // return <img src="/logo.png" alt="Dayflow Logo" className="h-8" />;

    return (
        <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-indigo-600 to-primary-600 text-white p-1.5 rounded-lg shadow-sm">
                <Briefcase className={className} />
            </div>
            <span className={`font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-primary-600 font-heading ${textClassName}`}>
                Dayflow
            </span>
        </div>
    );
};

export default Logo;
