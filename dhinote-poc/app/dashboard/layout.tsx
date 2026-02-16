import { redirect } from "next/navigation";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Header from "@/components/layout/Header";
import LeftSideBar from "@/components/layout/LeftSideBar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login');
    }

    return <div className="flex min-h-screen w-full">
        <LeftSideBar />
        <div className="flex w-full flex-col p-10">
            <Header />
            {children}
        </div>
    </div>;
}