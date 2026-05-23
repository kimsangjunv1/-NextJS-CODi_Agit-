import { ComponentProps } from "react";

import { HomePanel } from "@/widgets/home";
import PageFrame from "@/widgets/layout/PageFrame";

type HomeViewProps = {
    initialData: ComponentProps<typeof HomePanel>["initialData"];
    frame?: Pick<ComponentProps<typeof PageFrame>, "id" | "className">;
};

export default function HomeView({
    initialData,
    frame = { id: "home", className: { inner: "min-h-[100dvh]", container: "" } },
}: HomeViewProps) {
    return (
        <PageFrame id={frame.id} className={frame.className}>
            <HomePanel initialData={initialData} />
        </PageFrame>
    );
}
