// src/lib/authOptions.ts
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "이메일", type: "email" },
                password: { label: "비밀번호", type: "password" },
            },
            async authorize(credentials) {
                if (credentials?.email === "test@test.com" && credentials.password === "1234") {
                    return { id: "1", name: "상준", email: "test@test.com" }
                }
                return null
            },
        }),
    ],
    session: { strategy: "jwt" },
    pages: { signIn: "/login" },
};