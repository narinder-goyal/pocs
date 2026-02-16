import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        phone?: string;
        is_active?: boolean;
        is_verified?: boolean;
        is_first_time_logged_in?: boolean;
        timezone?: string;
        created_at?: string;
        updated_at?: string;
    }

    interface Session extends DefaultSession {
        user: User;
        accessToken: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken: string;
        user: import("next-auth").User;
    }
}