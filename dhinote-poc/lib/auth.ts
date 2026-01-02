import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getPublicToken } from '@/lib/publicToken';

import { API_BASE_URL, API_ROUTES } from "@/utils/constants";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error('Email and password are required');
                    }

                    // 1) Get public API token
                    const publicToken = await getPublicToken();
                    
                    // 2) Call backend login
                    const loginUrl = `${API_BASE_URL}${API_ROUTES.LOGIN}`;

                    const res = await fetch(loginUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${publicToken}`,
                        },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                    });

                    const text = await res.text();
                    
                    let data: any = null;
                    try {
                        data = text ? JSON.parse(text) : null;
                    } catch (e) {
                        console.error('Failed to parse login response JSON:', e);
                    }
                    if (!res.ok) {
                        // backend returned error
                        const msg =
                            data?.message ||
                            data?.error ||
                            `Login failed with status ${res.status}`;
                        throw new Error(msg);
                    }

                    // 3) Read access token from response
                    const backendAccessToken = data?.token;

                    if (!backendAccessToken) {
                        console.error('Login data without access token:', data);
                        throw new Error('Login succeeded but no access token returned');
                    }

                    const user = data?.user ?? {};
                    return {...user , accessToken:backendAccessToken} as any;

                } catch (err: any) {
                    console.error('AUTHORIZE ERROR:', err);
                    throw new Error(err?.message || 'Login failed');
                }
            },
        }),
    ],
    session: { strategy: 'jwt' },
    pages: { signIn: '/login' },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token.user) {
                session.user = { ...session.user, ...(token.user as any) };
            }
            (session as any).accessToken = token.accessToken;
            return session;
        },
    },
};