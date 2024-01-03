import { db } from "@/datastore";
import { NextResponse } from "next/server";

export async function GET(req: Request, route: { params: { postId: string } }) {
  try {
    const { postId } = route.params;

    const post = await db.retrievePostById(postId);

    // const filteredComments = post.comments.map((item: any) => ({
    //   body: item.body,
    //   createdAt: item.createdAt,
    //   user: {
    //     id: item.user.id,
    //     name: item.user.name,
    //     username: item.user.username,
    //     profileImage: item.user.profileImage,
    //     email: item.user.email,
    //   },
    //   likes: item.likes.length,
    //   hasLiked: false,
    //   id: item.id,
    // }));
    const filteredComments = [
      {
        body: "test comment",
        likes: 0,
        hasLiked: false,
        id: 1,
        createdAt: "Dec 1, 2023",
        user: {
          id: "1",
          name: "John Doe",
          username: "john123",
          profileImage:
            "https://res.cloudinary.com/demo/image/twitter/1330457336.jpg",
          email: "john123@gmail.com",
        },
      },
    ];

    return NextResponse.json(filteredComments);
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
