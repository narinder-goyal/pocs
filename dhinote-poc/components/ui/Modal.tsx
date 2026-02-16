'use client';

import { ReactNode, useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children?: ReactNode;
    primaryActionLabel?: string;
    onPrimaryAction?: () => void;
    secondaryActionLabel?: string;
}

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    primaryActionLabel,
    onPrimaryAction,
    secondaryActionLabel = 'Close',
}: ModalProps) {
    useEffect(() => {
        if (!isOpen) {
            document.body.classList.remove('modal-open');
            return;
        }

        document.body.classList.add('modal-open');

        const listener = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', listener);
        return () => {
            document.body.classList.remove('modal-open');
            window.removeEventListener('keydown', listener);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-blur">
            <div className="w-full max-w-md rounded-lg bg-white p-5 shadow-lg text-center">
                {title && (
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600"
                            aria-label="Close"
                        >
                            ×
                        </button>
                    </div>
                )}

                <div className="mb-4 text-sm text-gray-700">{children}</div>

                {primaryActionLabel && onPrimaryAction && (
                    <div className="flex justify-center  gap-2">
                        <button
                            type="button"
                            onClick={onPrimaryAction}
                            className="flex items-center justify-center gap-3 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-200"
                        >
                            {primaryActionLabel}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}