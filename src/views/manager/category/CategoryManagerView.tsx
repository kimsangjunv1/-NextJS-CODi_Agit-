import { ComponentProps } from "react";

import { CategoryManagerPanel } from "@/widgets/manager/category";
import PageFrame from "@/widgets/layout/PageFrame";

type CategoryManagerViewProps = {
    frame?: Pick<ComponentProps<typeof PageFrame>, "id" | "className">;
};

export default function CategoryManagerView({
    frame = { id: "manager-category", className: { inner: "flex flex-col gap-[2.4rem]", container: "" } },
}: CategoryManagerViewProps) {
    return (
        <PageFrame id={frame.id} className={frame.className}>
            <CategoryManagerPanel />
        </PageFrame>
    );
}
