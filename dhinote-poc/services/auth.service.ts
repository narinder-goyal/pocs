import { API_BASE_URL, API_ROUTES } from "@/utils/constants";
import { getPublicToken } from '@/lib/publicToken';

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

    const res = await fetch(`${API_BASE_URL}${API_ROUTES.REGISTER}`, {
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
    const res = await fetch(`${API_BASE_URL}${API_ROUTES.LOGOUT}`, {
        method: 'POST',
        headers: {
            ...jsonHeaders,
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
    });

    return handleResponse(res);
}