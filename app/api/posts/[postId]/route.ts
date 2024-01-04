import { retrievePostById } from "@/services/postService";
import { NextResponse } from "next/server";

export async function GET(req: Request, route: { params: { postId: string } }) {
  try {
    const { postId } = route.params;

    const post = await retrievePostById(postId);

    return NextResponse.json(post);
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
