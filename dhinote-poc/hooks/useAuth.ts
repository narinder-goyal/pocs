'use client';

import { useSession } from 'next-auth/react';

export function useAuth() {
    const { data, status } = useSession();
    const user = data?.user;
    const accessToken = (data as any)?.accessToken;

    return {
        user,
        accessToken,
        isAuthenticated: !!data,
        isLoading: status === 'loading',
    };
}