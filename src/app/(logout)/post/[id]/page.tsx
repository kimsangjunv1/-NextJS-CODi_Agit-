import PostDetailView from "@/views/post/PostDetailView";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    return <PostDetailView id={id} />;
};

export default Page;
