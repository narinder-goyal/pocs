'use client';

import Button from '@/components/ui/Button';
import { useSession, signOut } from 'next-auth/react';
import { logoutBackend } from '@/services/auth.service';

export default function SignOutButton() {
    const { data: session } = useSession();

    const handleClick = async () => {
        const accessToken = session?.user?.accessToken;

        try {
            if (accessToken) {
                await logoutBackend(accessToken, {
                    device_token: 'web',
                    logout_all: false,
                });
            }
        }
        catch { }
        finally {
            await signOut({ callbackUrl: '/login' });
        }
    };

    return (
        <Button variant="outline" onClick={handleClick}>
            Logout
        </Button>
    );
}

