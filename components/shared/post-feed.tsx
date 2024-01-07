import { IUser } from "@/interfaces";
import PostItem from "./post-item";
import { retrievePostsByUserId } from "@/services/postService";

interface Props {
  userId: string;
  user: IUser;
}

const PostFeed = async ({ userId, user }: Props) => {
  const posts = await retrievePostsByUserId(userId);
  return posts?.map((post) => (
    <PostItem key={post.id} post={post} user={user} />
  ));
};

export default PostFeed;
