'use client';

import { useEffect } from "react";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Global app error:', error);
    }, [error]);
    return (
        <div className="flex min-h-screen flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-bold text-red-600">
                Something went wrong
            </h2>

            <p className="mt-2 text-sm text-gray-600">
                {process.env.NODE_ENV === 'development' && error.message}
            </p>

            <button
                onClick={reset}
                className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
                Try again
            </button>
        </div>
    );
}
