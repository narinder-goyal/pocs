import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
// const token = cookies().get("user_token");
// if (!token) redirect("/login");


return <div className="p-6">{children}</div>;
}