import Main from "@/components/layout/Main";

import ListSection from "@/containers/signup/ListSection";


const Page = () => {
    return (
        <Main id={"login"} className={{ inner: "flex flex-col gap-[2.4rem] ", container:"" }}>
            <ListSection />
        </Main>
    )
}

export default Page