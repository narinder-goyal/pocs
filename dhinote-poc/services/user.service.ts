const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const jsonHeaders = { 'Content-Type': 'application/json' };

async function handleResponse(res: Response) {
    const data = await res.json().catch(() => null);
    if (!res.ok) {
        throw new Error(data?.message || data?.error || 'Request failed');
    }
    return data;
}

export async function fetchUserDetails(
    userId: string,
    accessToken: string,
) {
    const res = await fetch(`${API_BASE_URL}/api/v1/users/${userId}`, {
        headers: {
            ...jsonHeaders,
            Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store',
    });

    return handleResponse(res);
}

export async function fetchUserNotes(accessToken: string) {
    const res = await fetch(`${API_BASE_URL}/api/v1/notes`, {
        headers: {
            ...jsonHeaders,
            Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store',
    });

    return handleResponse(res);
}