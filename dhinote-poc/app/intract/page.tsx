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
      <div className='p-[14px]'>
        <Link href="/dashboard" className="flex items-center gap-2">Skip for Now
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0)"><path d="M7 7H17V10L21 6L17 2V5H5V11H7V7ZM17 17H7V14L3 18L7 22V19H19V13H17V17Z" fill="#606060" /></g><defs><clipPath id="clip0"> <rect width="24" height="24" fill="white" /> </clipPath></defs></svg>
        </Link>
      </div>

    </div>
  )

}