// import {
//     createSlice,
//     createAsyncThunk,
//     PayloadAction,
// } from '@reduxjs/toolkit';
// import type {
//     User,
//     RegisterPayload,
//     LoginPayload,
//     LogoutPayload,
//     AuthResponse,
// } from '@/types/user';
// import * as authService from '@/services/auth.service';
// import {
//     ACCESS_TOKEN_KEY,
//     REFRESH_TOKEN_KEY,
//     USER_KEY,
// } from '@/utils/constants';

// export interface AuthState {
//     user: User | null;
//     accessToken: string | null;
//     refreshToken: string | null;
//     loading: boolean;
//     error: string | null;
// }

// const initialState: AuthState = {
//     user: null,
//     accessToken: null,
//     refreshToken: null,
//     loading: false,
//     error: null,
// };

// export const registerUser = createAsyncThunk<
//     AuthResponse,
//     RegisterPayload,
//     { rejectValue: string }
// >('auth/registerUser', async (payload, { rejectWithValue }) => {
//     try {
//         return await authService.register(payload);
//     } catch (err: any) {
//         return rejectWithValue(err.message || 'Unable to create account');
//     }
// });

// export const loginUser = createAsyncThunk<
//     AuthResponse,
//     LoginPayload,
//     { rejectValue: string }
// >('auth/loginUser', async (payload, { rejectWithValue }) => {
//     try {
//         return await authService.login(payload);
//     } catch (err: any) {
//         return rejectWithValue(err.message || 'Unable to login');
//     }
// });

// export const logoutUser = createAsyncThunk<
//     void,
//     LogoutPayload,
//     { rejectValue: string; state: { auth: AuthState } }
// >('auth/logoutUser', async (payload, { getState, rejectWithValue }) => {
//     try {
//         const { accessToken } = getState().auth;
//         await authService.logout(accessToken, payload);
//     } catch (err: any) {
//         return rejectWithValue(err.message || 'Unable to logout');
//     }
// });

// const isBrowser = typeof window !== 'undefined';

// function saveAuthToStorage(user: User, accessToken: string, refresh?: string) {
//     if (!isBrowser) return;
//     localStorage.setItem(USER_KEY, JSON.stringify(user));
//     localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
//     if (refresh) localStorage.setItem(REFRESH_TOKEN_KEY, refresh);

//     document.cookie = `accessToken=${accessToken}; path=/;`;
// }

// function clearAuthStorage() {
//     if (!isBrowser) return;
//     localStorage.removeItem(USER_KEY);
//     localStorage.removeItem(ACCESS_TOKEN_KEY);
//     localStorage.removeItem(REFRESH_TOKEN_KEY);
//     document.cookie = 'accessToken=; path=/; Max-Age=0;';
// }

// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         hydrateAuthFromStorage(
//             state,
//             action: PayloadAction<{
//                 user: User | null;
//                 accessToken: string | null;
//                 refreshToken: string | null;
//             }>,
//         ) {
//             state.user = action.payload.user;
//             state.accessToken = action.payload.accessToken;
//             state.refreshToken = action.payload.refreshToken;
//         },
//         clearAuthState(state) {
//             state.user = null;
//             state.accessToken = null;
//             state.refreshToken = null;
//             state.error = null;
//             clearAuthStorage();
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(registerUser.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(
//                 registerUser.fulfilled,
//                 (state, action: PayloadAction<AuthResponse>) => {
//                     state.loading = false;
//                     state.error = null;
//                     state.user = action.payload.user;
//                     state.accessToken = action.payload.tokens.accessToken;
//                     state.refreshToken = action.payload.tokens.refreshToken || null;
//                     saveAuthToStorage(
//                         action.payload.user,
//                         action.payload.tokens.accessToken,
//                         action.payload.tokens.refreshToken,
//                     );
//                 },
//             )
//             .addCase(registerUser.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = (action.payload as string) || 'Unable to create account';
//             });

//         builder
//             .addCase(loginUser.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(
//                 loginUser.fulfilled,
//                 (state, action: PayloadAction<AuthResponse>) => {
//                     state.loading = false;
//                     state.error = null;
//                     state.user = action.payload.user;
//                     state.accessToken = action.payload.tokens.accessToken;
//                     state.refreshToken = action.payload.tokens.refreshToken || null;
//                     saveAuthToStorage(
//                         action.payload.user,
//                         action.payload.tokens.accessToken,
//                         action.payload.tokens.refreshToken,
//                     );
//                 },
//             )
//             .addCase(loginUser.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = (action.payload as string) || 'Unable to login';
//             });

//         builder
//             .addCase(logoutUser.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(logoutUser.fulfilled, (state) => {
//                 state.loading = false;
//                 state.user = null;
//                 state.accessToken = null;
//                 state.refreshToken = null;
//                 clearAuthStorage();
//             })
//             .addCase(logoutUser.rejected, (state, action) => {
//                 state.loading = false;
//                 state.user = null;
//                 state.accessToken = null;
//                 state.refreshToken = null;
//                 clearAuthStorage();
//                 state.error = (action.payload as string) || 'Unable to logout';
//             });
//     },
// });

// export const { hydrateAuthFromStorage, clearAuthState } = authSlice.actions;
// export default authSlice.reducer;