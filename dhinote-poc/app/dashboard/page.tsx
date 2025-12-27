'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import SignOutButton from "@/components/auth/SignOut";


export default function Dashboard() {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (!isAuthenticated) {
            router.replace('/login');
        }
    }, [isAuthenticated, router]);
    if (!isAuthenticated) return null;
    return (
        <div className="space-y-4">
            <h1 className="text-xl font-bold">Dashboard</h1>
            <h2 className="text-2xl font-semibold">
                Welcome, {user?.first_name ?? 'User'}
            </h2>

            <SignOutButton />
        </div>
    );
}