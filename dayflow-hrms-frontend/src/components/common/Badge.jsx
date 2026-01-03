import React from 'react';

const Badge = ({ children, variant = 'primary', className = '' }) => {
    const variants = {
        primary: "bg-primary-100 text-primary-700 border-primary-200",
        secondary: "bg-slate-100 text-slate-700 border-slate-200",
        success: "bg-green-100 text-green-700 border-green-200",
        warning: "bg-orange-100 text-orange-700 border-orange-200",
        danger: "bg-red-100 text-red-700 border-red-200",
    };

    return (
        <span className={`
      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
      ${variants[variant] || variants.secondary}
      ${className}
    `}>
            {children}
        </span>
    );
};

export default Badge;
