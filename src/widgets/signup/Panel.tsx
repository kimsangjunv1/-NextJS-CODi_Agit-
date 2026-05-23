"use client";

import { SignupPageProvider } from "@/widgets/signup/model/SignupContext";

import * as SignupLayer from "@/widgets/signup/ui";

export default function Panel() {
    return (
        <SignupPageProvider>
            <SignupLayer.SignupForm />
        </SignupPageProvider>
    );
}
