import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { setLoginFetch } from "@/services/user.api";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "이메일", type: "email" },
                password: { label: "비밀번호", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) return null;

                try {
                    const data = await setLoginFetch({ email: credentials.email, password: credentials.password });

                    if (!data) return null;

                    // JWT와 세션에 저장할 값만 뽑기
                    const user = {
                        id: data.body.result.id,
                        name: data.body.result.name,
                        email: credentials.email,
                    };

                    return user;
                } catch (err) {
                    console.error("로그인 에러:", err);

                    return null;
                }
            },
        }),
    ],
    session: { strategy: "jwt" },
    pages: { signIn: "/login" },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
            }

            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                token.id = token.id as string;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
            }

            return session;
        },
    },
};