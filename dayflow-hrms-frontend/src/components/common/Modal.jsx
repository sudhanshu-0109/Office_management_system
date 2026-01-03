import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-xl',
        lg: 'max-w-3xl',
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">

                {/* API Overlay */}
                <div
                    className="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity backdrop-blur-sm"
                    aria-hidden="true"
                    onClick={onClose}
                ></div>

                {/* Centering trick */}
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                {/* Modal Panel */}
                <div className={`
          inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full ${sizes[size]}
          animate-scaleIn
        `}>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
                            <h3 className="text-lg leading-6 font-bold text-slate-900" id="modal-title">
                                {title}
                            </h3>
                            <button
                                onClick={onClose}
                                className="bg-slate-100 rounded-full p-1 text-slate-400 hover:text-slate-500 hover:bg-slate-200 transition-colors focus:outline-none"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="mt-2">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
