import { ComponentProps } from "react";

import { LoginPanel } from "@/widgets/login";
import PageFrame from "@/widgets/layout/PageFrame";

type LoginViewProps = {
    frame?: Pick<ComponentProps<typeof PageFrame>, "id" | "className">;
};

export default function LoginView({
    frame = { id: "login", className: { inner: "flex flex-col gap-[2.4rem]", container: "" } },
}: LoginViewProps) {
    return (
        <PageFrame id={frame.id} className={frame.className}>
            <LoginPanel />
        </PageFrame>
    );
}
