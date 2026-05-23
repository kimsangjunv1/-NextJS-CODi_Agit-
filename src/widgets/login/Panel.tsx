"use client";

import { LoginPageProvider } from "@/widgets/login/model/LoginContext";

import * as LoginLayer from "@/widgets/login/ui";

export default function Panel() {
    return (
        <LoginPageProvider>
            <LoginLayer.LoginForm />
        </LoginPageProvider>
    );
}
