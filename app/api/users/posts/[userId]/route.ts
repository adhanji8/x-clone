import { retrievePostsByUserId } from "@/services/postService";
import { NextResponse } from "next/server";

export async function GET(req: Request, route: { params: { userId: string } }) {
  try {
    const posts = (await retrievePostsByUserId(route.params.userId)) || [];

    return NextResponse.json(posts);
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
