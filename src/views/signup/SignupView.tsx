import { ComponentProps } from "react";

import { SignupPanel } from "@/widgets/signup";
import PageFrame from "@/widgets/layout/PageFrame";

type SignupViewProps = {
    frame?: Pick<ComponentProps<typeof PageFrame>, "id" | "className">;
};

export default function SignupView({
    frame = { id: "signup", className: { inner: "flex flex-col gap-[2.4rem]", container: "" } },
}: SignupViewProps) {
    return (
        <PageFrame id={frame.id} className={frame.className}>
            <SignupPanel />
        </PageFrame>
    );
}
