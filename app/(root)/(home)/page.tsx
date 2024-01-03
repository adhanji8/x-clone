import Form from "@/components/shared/form";
import Header from "@/components/shared/header";
import PostItem from "@/components/shared/post-item";
import { IPost, IUser } from "@/interfaces";
import { getPosts } from "@/lib/service";
import useAuthServer from "@/lib/useAuthServer";

export default async function Page() {
  const user: IUser = await useAuthServer();
  if (!user) return;
  const posts = await getPosts(user);

  return (
    <>
      <Header label="Home" />
      <Form placeholder="What's on your mind?" user={user} />
      <Posts posts={posts} user={user} />
    </>
  );
}

function Posts({ posts, user }: any) {
  return (
    <>
      {posts.map((post: IPost) => (
        <PostItem key={post.id} post={post} user={user} />
      ))}
    </>
  );
}
