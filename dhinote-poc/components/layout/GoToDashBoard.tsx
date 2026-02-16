"use client";
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function GoToDashBoard() {
    const { data: session } = useSession();
    const accessToken = session?.user.accessToken;

    if (!accessToken) {
        return (
            <div className="flex gap-4">
                <Link href="/login" className="px-8 py-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition w-full">
                    Login
                </Link>
                <Link href="/signup" className="px-8 py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition flex items-center justify-center gap-2 w-full">
                    Create Account
                    <span>›</span>
                </Link>
            </div>
        );
    }
    return (
        <div className="flex justify-center gap-4">
            <Link href="/dashboard" className="px-8 py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition flex items-center justify-center gap-2 w-[60%]">
                Go To DashBoard <span>›</span>
            </Link>
        </div>
    );
}