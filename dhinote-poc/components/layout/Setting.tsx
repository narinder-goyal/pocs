import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function Setting() {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    return (
        <>
            <div>
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">
                        Welcome, {user?.first_name} {user?.last_name}
                    </h1>
                </div>

                <p className="text-gray-600">
                    You are logged in as <b>{user?.email}</b>.
                </p>
            </div>
        </>
    );
}