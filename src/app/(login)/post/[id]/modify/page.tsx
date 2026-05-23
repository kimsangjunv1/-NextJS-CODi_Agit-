import PostModifyView from "@/views/post/modify/PostModifyView";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    return <PostModifyView id={id} />;
};

export default Page;
