import Main from "@/components/layout/Main";

import ListSection from "@/containers/manager/ListSection";

const Page = () => {
    return (
        <Main id={"home"} className={{ inner: "flex flex-col gap-[2.4rem] pt-[var(--header-height)]", container:"" }}>
            <ListSection />
        </Main>
    )
}

export default Page