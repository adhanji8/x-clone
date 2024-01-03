import { db } from "@/datastore";
import useAuthServer from "@/lib/useAuthServer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { body, userId } = await req.json();
    const post = await db.insertPost(body, userId);

    // const post = await Post.create({ body, user: userId });

    return NextResponse.json(post);
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit");
    const username = searchParams.get("username") as string;
    const currentUser = await db.retrieveUserByUsername(username);

    const posts = await db.retrievePostsByUsername(username);

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
      likes: post.likes,
      comments: post.comments,
      hasLiked: false,
      id: post.id,
    }));

    return NextResponse.json(filteredPosts);
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}

// export async function DELETE(req: Request) {
//   try {
//     await connectToDatabase();
//     const { postId, userId } = await req.json();

//     await Post.findByIdAndDelete(postId);

//     return NextResponse.json({ message: "Post deleted successfully" });
//   } catch (error) {
//     const result = error as Error;
//     return NextResponse.json({ error: result.message }, { status: 400 });
//   }
// }
