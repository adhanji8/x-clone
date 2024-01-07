import CommentItem from "@/components/shared/comment-item";
import Form from "@/components/shared/form";
import Header from "@/components/shared/header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { sliceText } from "@/lib/utils";
import { IPost, IUser } from "@/interfaces";
import { formatDistanceToNowStrict } from "date-fns";
import React from "react";
import useAuthServer from "@/lib/useAuthServer";
import { IComment } from "../../../../interfaces/IPost";
import {
  retrieveCommentsByPostId,
  retrievePostById,
} from "@/services/postService";

export default async function Page({ params }: { params: { postId: string } }) {
  const [user, post, comments] = await Promise.all([
    useAuthServer(),
    retrievePostById(params.postId),
    retrieveCommentsByPostId(params.postId),
  ]);
  if (!user || !post || !comments) return { error: "entity not found" };

  return (
    <>
      <Header label="Posts" isBack />
      <OriginalPost post={post} />
      <Form
        placeholder="Post your reply?"
        user={user}
        postId={params.postId}
        isComment
      />
      <Comments comments={comments} user={user} />
    </>
  );
}

function OriginalPost({ post }: { post: IPost }) {
  return (
    <div className="border-b-[1px] p-5 cursor-pointer border-slate-200 dark:border-neutral-800 transition">
      <div className="flex flex-row items-center gap-3">
        <Avatar>
          <AvatarImage src={post?.user.profileImage} />
          <AvatarFallback>{post?.user.name[0]}</AvatarFallback>
        </Avatar>

        <div>
          <div className="flex flex-row items-center gap-2">
            <p className="text-white font-semibold cursor-pointer hover:underline">
              {post?.user.name}
            </p>
            <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
              {post && post?.user.username
                ? `@${sliceText(post.user.username, 20)}`
                : post && sliceText(post.user.email, 20)}
            </span>
            <span className="text-neutral-500 text-sm">
              {post &&
                post.createdAt &&
                formatDistanceToNowStrict(new Date(post.createdAt))}
            </span>
          </div>
          <div className="text-white mt-1">{post?.body}</div>
        </div>
      </div>
    </div>
  );
}

function Comments({ comments, user }: { comments: IComment[]; user: IUser }) {
  return (
    <>
      {comments.map((comment) => (
        <CommentItem
          comment={comment}
          key={comment.id}
          user={user}
          comments={comments}
        />
      ))}
    </>
  );
}
