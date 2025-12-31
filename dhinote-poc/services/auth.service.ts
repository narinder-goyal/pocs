import { getPublicToken } from '@/lib/publicToken';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ;

const jsonHeaders = { 'Content-Type': 'application/json' };

export interface RegisterPayload {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone?: string;
    timezone?: string;
}

export interface LogoutPayload {
    device_token: string;
    logout_all: boolean;
}

async function handleResponse(res: Response) {
    const data = await res.json().catch(() => null);
    if (!res.ok) {
        throw new Error(data?.message || data?.error || 'Request failed');
    }
    return data;
}

export async function registerUser(payload: RegisterPayload) {
    const publicToken = await getPublicToken();

    const res = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: {
            ...jsonHeaders,
            Authorization: `Bearer ${publicToken}`,
        },
        body: JSON.stringify(payload),
    });

    return handleResponse(res);
}

export async function logoutBackend(
    accessToken: string,
    payload: LogoutPayload,
) {
    const res = await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
        method: 'POST',
        headers: {
            ...jsonHeaders,
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
    });

    return handleResponse(res);
}