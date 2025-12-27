// 'use client';

// import { ReactNode, useEffect, useRef } from 'react';
// import { Provider } from 'react-redux';
// import { store } from './store';
// import { hydrateAuthFromStorage } from './redux/auth/authSlice';
// import {
//     ACCESS_TOKEN_KEY,
//     REFRESH_TOKEN_KEY,
//     USER_KEY,
// } from '@/utils/constants';
// import type { User } from '@/types/user';

// export default function StoreProvider({ children }: { children: ReactNode }) {
//     const hydrated = useRef(false);

//     useEffect(() => {
//         if (hydrated.current) return;
//         hydrated.current = true;

//         if (typeof window === 'undefined') return;

//         const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
//         const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
//         const userJson = localStorage.getItem(USER_KEY);
//         const user: User | null = userJson ? JSON.parse(userJson) : null;

//         store.dispatch(
//             hydrateAuthFromStorage({
//                 user,
//                 accessToken,
//                 refreshToken,
//             }),
//         );
//     }, []);

//     return <Provider store={store}>{children}</Provider>;
// }