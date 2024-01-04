import { retrievePostsByUserId } from "@/services/postService";
import { NextResponse } from "next/server";

export async function GET(req: Request, route: { params: { userId: string } }) {
  try {
    const posts = (await retrievePostsByUserId(route.params.userId)) || [];

    const filteredPosts = posts.map((post: any) => ({
      body: post.body,
      createdAt: post.createdAt,
      user: {
        id: post.user.id,
        name: post.user.name,
        username: post.user.username,
        profileImage: post.user.profileImage,
        email: post.user.email,
      },
      likes: post.likes.length,
      comments: post.comments.length,
      hasLiked: false,
      id: post.id,
    }));

    return NextResponse.json(filteredPosts);
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
