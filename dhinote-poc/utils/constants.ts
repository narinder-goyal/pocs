import { DEFAULT_CIPHERS } from "tls";

export const APP_NAME = 'DhiNote';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export const API_ROUTES = {
    PUBLIC_TOKEN: '/api/v1/auth/public-api/token',
    REGISTER: '/api/v1/auth/register',
    LOGIN: '/api/v1/auth/login',
    LOGOUT: '/api/v1/auth/logout',
    DEFAULT_TOPICS: '/api/v1/default-topics',
    DEFAULT_TOPICS_CATEGORIES: '/api/v1/default-topics-categories',
} as const;

export const CLIENT_ID = process.env.NEXT_PUBLIC_API_CLIENT_ID ?? '';
export const CLIENT_SECRET = process.env.NEXT_PUBLIC_API_CLIENT_SECRET ?? '';

// export const ACCESS_TOKEN_KEY = 'accessToken';
// export const REFRESH_TOKEN_KEY = 'refreshToken';
// export const USER_KEY = 'authUser';