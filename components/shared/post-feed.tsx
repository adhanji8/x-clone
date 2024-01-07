import { IUser } from "@/interfaces";
import PostItem from "./post-item";
import { retrievePostsByUserId } from "@/services/postService";

interface Props {
  userId: string;
  user: IUser;
}

const PostFeed = async ({ userId, user }: Props) => {
  const posts = await retrievePostsByUserId(userId);
  return (
    <div className="overflow-y-scroll h-[400px] sm:overflow-y-visible md:h-auto">
      {posts?.map((post) => (
        <PostItem key={post.id} post={post} user={user} />
      ))}
    </div>
  );
};
// overflow-y: scroll; height:400px;
export default PostFeed;
