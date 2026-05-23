"use client";

import { GetPostLatestListResponseType } from "@/entities/post/model/post.type";
import { HomePageProvider } from "@/widgets/home/model/HomeContext";

import * as HomeLayer from "@/widgets/home/ui";

type HomePanelProps = {
    initialData: GetPostLatestListResponseType;
};

export default function Panel({ initialData }: HomePanelProps) {
    return (
        <HomePageProvider>
            <HomeLayer.ArchiveFeed initialData={initialData} />
        </HomePageProvider>
    );
}
