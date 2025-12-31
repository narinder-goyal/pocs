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
        if (!isOpen) return;
        const listener = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', listener);
        return () => window.removeEventListener('keydown', listener);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={handleBackdropClick}
        >
            <div className="w-full max-w-md rounded-lg bg-white p-5 shadow-lg">
                <div className="mb-3 flex items-center justify-between">
                    {title && (
                        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                    )}
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>

                <div className="mb-4 text-sm text-gray-700">{children}</div>

                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                    >
                        {secondaryActionLabel}
                    </button>
                    {primaryActionLabel && onPrimaryAction && (
                        <button
                            type="button"
                            onClick={onPrimaryAction}
                            className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
                        >
                            {primaryActionLabel}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}