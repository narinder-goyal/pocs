import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id?: string;
            first_name: string;
            last_name: string;
            email: string;
            phone?: string;
            timezone?: string;
            email_verified?: boolean;
            access_token: string;
        } & DefaultSession["user"];
    }

    interface User {
        id?: string;
        first_name: string;
        last_name: string;
        email: string;
        phone?: string;
        timezone?: string;
        email_verified?: boolean;
        access_token: string;
    }
}
