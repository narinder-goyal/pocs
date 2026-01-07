import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {

return <div className="p-6">{children}</div>;
}