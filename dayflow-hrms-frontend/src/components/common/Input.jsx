import React, { forwardRef } from 'react';

const Input = forwardRef(({
    label,
    error,
    icon: Icon,
    className = '',
    ...props
}, ref) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Icon className="h-5 w-5" />
                    </div>
                )}
                <input
                    ref={ref}
                    className={`
            block w-full rounded-lg border-slate-900 shadow-sm 
            focus:border-primary-500 focus:ring-primary-500 
            disabled:bg-slate-50 disabled:text-slate-500
            transition-colors
            ${Icon ? 'pl-10' : 'pl-3'}
            ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
                    {...props}
                />
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-600 animate-fadeIn">{error}</p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
