import { db } from "@/datastore";
import { NextResponse } from "next/server";

export async function GET(req: Request, route: { params: { postId: string } }) {
  try {
    console.log("hi");
    const { postId } = route.params;

    const post = await db.retrievePostById(postId);
    console.log("The post was");
    console.log(post);

    return NextResponse.json(post);
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
