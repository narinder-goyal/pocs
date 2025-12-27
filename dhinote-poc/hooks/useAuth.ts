// 'use client';

// import { useDispatch, useSelector } from 'react-redux';
// import type { RootState, AppDispatch } from '@/lib/store';
// import {
//     loginUser,
//     registerUser,
//     logoutUser,
// } from '@/lib/redux/auth/authSlice';
// import type {
//     LoginPayload,
//     RegisterPayload,
//     LogoutPayload,
// } from '@/types/user';

// export function useAuth() {
//     const dispatch = useDispatch<AppDispatch>();
//     const { user, accessToken, loading, error } = useSelector(
//         (state: RootState) => state.auth,
//     );

//     return {
//         user,
//         isAuthenticated: Boolean(accessToken),
//         loading,
//         error,
//         login: (payload: LoginPayload) => dispatch(loginUser(payload)).unwrap(),
//         register: (payload: RegisterPayload) =>
//             dispatch(registerUser(payload)).unwrap(),
//         logout: (payload: LogoutPayload) => dispatch(logoutUser(payload)).unwrap(),
//     };
// }