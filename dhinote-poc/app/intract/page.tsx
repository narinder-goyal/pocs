import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import SignOutButton from '@/components/auth/SignOut';
import Link from 'next/link';
import Image from 'next/image';
import TopicForm from '@/components/forms/TopicForm';

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
      <div className='flex flex-col items-center text-center w-full mb-8'>
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
        <h1 className="text-[32px] font-bold text-slate-800">Let’s create your first topics</h1>
        <p className="mt-3 text-[#8E8E8E]">Topics help you group your notes and keep everything organized.  Think of them like folders or sections in a notebook.</p>
      </div>

      <TopicForm />
      

    </div>
  )

}