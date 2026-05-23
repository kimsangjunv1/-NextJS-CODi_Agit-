"use client";

import { CategoryManagerPageProvider } from "@/widgets/manager/category/model/CategoryManagerContext";

import * as CategoryManagerLayer from "@/widgets/manager/category/ui";

export default function Panel() {
    return (
        <CategoryManagerPageProvider>
            <CategoryManagerLayer.CategoryManager />
        </CategoryManagerPageProvider>
    );
}
