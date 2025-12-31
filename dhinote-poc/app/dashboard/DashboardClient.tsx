// 'use client';

// import SignOutButton from '@/components/auth/SignOut';

// interface Props {
//     profile: any;
//     notes: any[];
// }

// export default function DashboardClient({ profile, notes }: Props) {
//     const p = profile;
//     const n = notes ?? [];

//     return (
//         <div>
//             <div className="mb-4 flex items-center justify-between">
//                 <h1 className="text-2xl font-semibold">
//                     Welcome, {p?.first_name} {p?.last_name}
//                 </h1>
//                 <SignOutButton />
//             </div>

//             <section className="mb-4">
//                 <h2 className="text-lg font-semibold">Profile</h2>
//                 <p>Email: {p?.email}</p>
//                 {p?.phone && <p>Phone: {p.phone}</p>}
//             </section>

//             <section>
//                 <h2 className="text-lg font-semibold">Your Notes</h2>
//                 {n.length === 0 ? (
//                     <p>No notes yet.</p>
//                 ) : (
//                     <ul className="list-disc pl-5">
//                         {n.map((item: any) => (
//                             <li key={item.id}>{item.title}</li>
//                         ))}
//                     </ul>
//                 )}
//             </section>
//         </div>
//     );
// }