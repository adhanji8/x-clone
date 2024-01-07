import Form from "@/components/shared/form";
import Header from "@/components/shared/header";
import PostItem from "@/components/shared/post-item";
import { IPost, IUser } from "@/interfaces";
import useAuthServer from "@/lib/useAuthServer";
import { retrievePostsByUsername } from "@/services/postService";

export default async function Page() {
  const user = await useAuthServer();
  if (!user) return { error: true };
  const posts = await retrievePostsByUsername(user.username);
  if (!posts) return { error: true };

  return (
    <>
      <Header label="Home" />
      <Form placeholder="What's on your mind?" user={user} />
      <Posts posts={posts} user={user} />
    </>
  );
}

function Posts({ posts, user }: { posts: IPost[]; user: IUser }) {
  return (
    <>
      {posts.map((post: IPost) => (
        <PostItem key={post.id} post={post} user={user} />
      ))}
    </>
  );
}
