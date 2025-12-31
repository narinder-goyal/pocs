'use client';

import Button from '@/components/ui/Button';
import { useSession, signOut } from 'next-auth/react';
import { logoutBackend } from '@/services/auth.service';

export default function SignOutButton() {
    const { data: session } = useSession();

    const handleClick = async () => {
        const accessToken = (session as any)?.accessToken;

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


// export default function SignOutButton() {
//     return <Button variant="outline" onClick={() => signOut({ callbackUrl: "/login" })}>Logout</Button>;
// }
