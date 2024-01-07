import { retrievePostById } from "@/services/postService";
import { NextResponse } from "next/server";

export async function GET(req: Request, route: { params: { postId: string } }) {
  try {
    const { postId } = route.params;

    const post = await retrievePostById(postId);
    if (!post) return { error: true };

    const filteredComments = post.comments.map((item) => ({
      body: item.body,
      createdAt: item.createdAt,
      user: {
        id: item.user.id,
        name: item.user.name,
        username: item.user.username,
        profileImage: item.user.profileImage,
        email: item.user.email,
      },
      likes: item.likes,
      hasLiked: false,
      id: item.id,
    }));

    return NextResponse.json(filteredComments);
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
