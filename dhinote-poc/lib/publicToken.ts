const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_API_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_API_CLIENT_SECRET;

const jsonHeaders = { 'Content-Type': 'application/json' };

export async function getPublicToken(): Promise<string> {
    if (!CLIENT_ID || !CLIENT_SECRET) {
        throw new Error(
            'Client ID and Client Secret are required. Check .env.local',
        );
    }

    const res = await fetch(
        `${API_BASE_URL}/api/v1/auth/public-api/token`,
        {
            method: 'POST',
            headers: jsonHeaders,
            body: JSON.stringify({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
            }),
        },
    );

    const data = await res.json().catch(() => null);

    if (!res.ok) {
        throw new Error(data?.message || 'Failed to get public API token');
    }

    const token =
        data?.token ||
        data?.access_token ||
        data?.data?.token ||
        data?.data?.access_token;

    if (!token) {
        throw new Error('Unable to read public API token from response');
    }

    return token as string;
}