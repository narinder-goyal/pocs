'use client';

import { signOut } from "next-auth/react";
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

// const SignOutButton = () => {
//   const { logout, loading } = useAuth();
//   const router = useRouter();

//   const handleClick = async () => {
//     try {
//       await logout({ device_token: 'web', logout_all: false });
//     } finally {
//       router.push('/login');
//     }
//   };

//   return (
//     <Button variant="outline" onClick={handleClick} disabled={loading}>
//       Logout
//     </Button>
//   );
// };

// export default SignOutButton;



export default function SignOutButton() {
    return <Button variant="outline" onClick={() => signOut({ callbackUrl: "/login" })}>Logout</Button>;
}
