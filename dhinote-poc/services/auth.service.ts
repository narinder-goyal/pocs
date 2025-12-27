// import {
//   API_BASE_URL,
//   API_ROUTES,
//   API_CLIENT_ID,
//   API_CLIENT_SECRET,
// } from '@/utils/constants';
// import type {
//   RegisterPayload,
//   LoginPayload,
//   LogoutPayload,
//   AuthResponse,
// } from '@/types/user';

// const jsonHeaders = { 'Content-Type': 'application/json', };

// async function handleResponse(res: Response) {
//   let data: any = null;
//   try {
//     data = await res.json();
//   } catch {
//   }

//   if (!res.ok) {
//     const message =
//       data?.message ||
//       data?.error ||
//       `Request failed with status ${res.status}`;
//     throw new Error(message);
//   }

//   return data;
// }

// export async function getPublicApiToken(): Promise<string> {
  
//   try {
//     const res = await fetch(`${API_BASE_URL}${API_ROUTES.PUBLIC_TOKEN}`, {
//       method: 'POST',
//       headers: jsonHeaders,
//       body: JSON.stringify({
//         client_id: API_CLIENT_ID,
//         client_secret: API_CLIENT_SECRET,
//       }),
//     });

//     const data = await handleResponse(res);

//     const token =
//       data?.token || data?.access_token || data?.data?.token || data?.data?.access_token;

//     if (!token) {
//       throw new Error('Unable to read public API token from response');
//     }

//     return token as string;
//   } catch (err: any) {
//     if (err?.message === 'Failed to fetch' || err?.name === 'TypeError') {
//       throw new Error('Network connection unavailable');
//     }
//     throw err;
//   }
// }

// export async function register(
//   payload: RegisterPayload,
// ): Promise<AuthResponse> {
//   try {
//     const apiToken = await getPublicApiToken();

//     const res = await fetch(`${API_BASE_URL}${API_ROUTES.REGISTER}`, {
//       method: 'POST',
//       headers: {
//         ...jsonHeaders,
//         Authorization: `Bearer ${apiToken}`,
//       },
//       body: JSON.stringify(payload),
//     });

//     const data = await handleResponse(res);

//     const user = data.user ?? data.data?.user ?? data.data;
//     const tokens = {
//       accessToken:
//         data.access_token ??
//         data.token ??
//         data.data?.access_token ??
//         data.data?.token,
//       refreshToken: data.refresh_token ?? data.data?.refresh_token,
//     };

//     return { user, tokens, message: data.message };
//   } catch (err: any) {
//     if (err?.message === 'Failed to fetch' || err?.name === 'TypeError') {
//       throw new Error('Network connection unavailable');
//     }
//     throw err;
//   }
// }

// export async function login(payload: LoginPayload): Promise<AuthResponse> {
//   try {
//     const apiToken = await getPublicApiToken();

//     const res = await fetch(`${API_BASE_URL}${API_ROUTES.LOGIN}`, {
//       method: 'POST',
//       headers: {
//         ...jsonHeaders,
//         Authorization: `Bearer ${apiToken}`,
//       },
//       body: JSON.stringify(payload),
//     });

//     const data = await handleResponse(res);

//     const user = data.user ?? data.data?.user ?? data.data;
//     const tokens = {
//       accessToken:
//         data.access_token ??
//         data.token ??
//         data.data?.access_token ??
//         data.data?.token,
//       refreshToken: data.refresh_token ?? data.data?.refresh_token,
//     };

//     return { user, tokens, message: data.message };
//   } catch (err: any) {
//     if (err?.message === 'Failed to fetch' || err?.name === 'TypeError') {
//       throw new Error('Network connection unavailable');
//     }
//     throw err;
//   }
// }

// export async function logout(
//   accessToken: string | null,
//   payload: LogoutPayload,
// ): Promise<void> {
//   if (!accessToken) return;

//   try {
//     const res = await fetch(`${API_BASE_URL}${API_ROUTES.LOGOUT}`, {
//       method: 'POST',
//       headers: {
//         ...jsonHeaders,
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: JSON.stringify(payload),
//     });

//     await handleResponse(res);
//   } catch (err: any) {
//     if (err?.message === 'Failed to fetch' || err?.name === 'TypeError') {
//       throw new Error('Network connection unavailable');
//     }
//     throw err;
//   }
// }