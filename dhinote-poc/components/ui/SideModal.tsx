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

export default function SideModal({
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
        <div className="fixed inset-0 z-50 flex items-strach justify-end bg-black/40" onClick={handleBackdropClick} >
            <div className="w-full max-w-[716px] rounded-tl-[12px] rounded-bl-[12px] bg-white p-8 pl-5 shadow-lg">
                {title && (
                    <div className="pb-8 flex items-center justify-start gap-1">
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600"
                            aria-label="Close"
                        >
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_323_23175)"><path d="M20.5465 9.88L18.6665 8L10.6665 16L18.6665 24L20.5465 22.12L14.4398 16L20.5465 9.88Z" fill="#777777" /></g><defs><clipPath id="clip0_323_23175"><rect width="32" height="32" fill="white" /></clipPath></defs></svg>
                        </button>
                        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                    </div>
                )}

                {children}

                {/* <div className="flex justify-end gap-2">
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
                </div> */}
            </div>
        </div>
    );
}