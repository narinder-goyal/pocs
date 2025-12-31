import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import SignOutButton from '@/components/auth/SignOut';

export default async function DashboardPage() {


  const session = await getServerSession(authOptions);
  console.log("session",session)

  if (!session) {
    redirect('/login');
  }

  const user = session.user as any;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Welcome, {user?.first_name} {user?.last_name}
        </h1>
        <SignOutButton />
      </div>

      <p className="text-gray-600">
        You are logged in as <b>{user?.email}</b>.
      </p>

      <p className="mt-2 text-sm text-gray-500">
        Dashboard API integration (profile, notes, etc.) will be wired once we
        confirm the exact endpoints from your Swagger docs.
      </p>
    </div>
  );
}