import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import SignOutButton from '@/components/auth/SignOut';
import Link from 'next/link';
import Image from 'next/image';

export default async function DashboardPage() {


  const session = await getServerSession(authOptions);
  console.log("session", session)

  if (!session) {
    redirect('/login');
  }

  const user = session.user as any;
  return (
    <div className="w-full max-w-[520px] mx-auto flex flex-col items-center">
      {/* Intract ----- {user?.first_name} {user?.last_name} */}
      <div className="mb-6 flex flex-col items-center">
        <Link href="/" className="w-12 h-12 mb-2 text-[#2AB09C]">
          <Image
            src="/images/logo.svg"
            alt="dhinote logo"
            width={80}
            height={80}
            className=""
          />
        </Link>
        <span className="text-2xl font-bold tracking-tight text-slate-700">dhinote</span>
      </div>

      <h1 className="text-xl font-medium text-slate-800 mb-8">Log-in to your Account</h1>
      <p className="text-center text-sm font-medium">Topics help you group your notes and keep everything organized.  Think of them like folders or sections in a notebook.
      </p>

    </div>
  )

}