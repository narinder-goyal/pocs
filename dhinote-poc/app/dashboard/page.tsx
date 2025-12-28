'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import SignOutButton from "@/components/auth/SignOut";


export default function Dashboard() {
    const user = useSelector((state: RootState) => state.auth.user);
    const router = useRouter();
    // useEffect(() => {
    //     if (!isAuthenticated) {
    //         router.replace('/login');
    //     }
    // }, [isAuthenticated, router]);
    // if (!isAuthenticated) return null;
    return (
        <div className="space-y-4">
            <h1 className="text-xl font-bold">Dashboard</h1>
            {/* <h2 className="text-2xl font-semibold">Welcome, {user?.first_name ?? 'User'} </h2> */}
            <p>Welcome {user?.first_name}</p>
            <p>Email: {user?.email}</p>
            <SignOutButton />
        </div>
    );
}