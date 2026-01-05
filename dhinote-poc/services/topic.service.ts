import { getPublicToken } from "@/lib/publicToken";

import { API_BASE_URL, API_ROUTES } from "@/utils/constants";

const jsonHeaders = { 'Content-Type': 'application/json' };

async function handleResponse(res: Response) {
    console.log(res);
    const data = await res.json().catch(() => null);
    if (!res.ok) {
        throw new Error(data?.message || data?.error || 'Request failed');
    }
    return data;
}

export interface DefaultTopicsCategoryRef {
    id: number;
    name: string;
}

export interface DefaultTopic {
    id: number;
    name: string;
    default_topics_category: DefaultTopicsCategoryRef;
}

export interface DefaultTopicsCategoryTopic {
    id: number;
    name: string;
}

export interface DefaultTopicsCategory {
    id: number;
    name: string;
    defaultTopics: DefaultTopicsCategoryTopic[];
}

export interface UserTopicItemPayload {
    name: string;
    color_code_id: number;
}

export interface UserTopicsPayload {
    user_id: string;
    topics: UserTopicItemPayload[];
    is_skipped: boolean;
}

export async function fetchDefaultTopics(
    accessToken?: string,
): Promise<DefaultTopic[]> {
    const headers: Record<string, string> = { ...jsonHeaders };
    if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
    }

    const res = await fetch(`${API_BASE_URL}${API_ROUTES.DEFAULT_TOPICS}`, {
        method: 'GET',
        headers,
        cache: 'no-store',
    });

    const data = await handleResponse(res);

    console.log("fetch_Default_Topics-", res);

    return Array.isArray(data) ? (data as DefaultTopic[]) : [];
}

export async function fetchDefaultTopicCategories(
    accessToken?: string,
): Promise<DefaultTopicsCategory[]> {
    const headers: Record<string, string> = { ...jsonHeaders };

    // console.log("------> ", accessToken);
    if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
    }
    // console.log("headers -", headers)

    const res = await fetch(`${API_BASE_URL}${API_ROUTES.DEFAULT_TOPICS_CATEGORIES}`, {
        method: 'GET',
        headers,
        cache: 'no-store',
    });

    const data = await handleResponse(res);
    // console.log("acctoc:- ", res);
    return Array.isArray(data) ? (data as DefaultTopicsCategory[]) : [];
}

export async function saveUserTopics(
    payload: UserTopicsPayload,
    accessToken?: string,
) {

    // console.log("saveUserTopics --> ", accessToken);
    if (!accessToken) {
        throw new Error('Missing access token');
    }

    const res = await fetch(`${API_BASE_URL}${API_ROUTES.USER_TOPICS}`, {
        method: 'POST',
        headers: {
            ...jsonHeaders,
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
    });
    // console.log("saveUserTopics RES:- ", res);
    return handleResponse(res);
}