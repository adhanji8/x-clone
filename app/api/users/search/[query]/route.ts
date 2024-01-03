import { NextResponse } from "next/server";
import { db } from "@/datastore";
import { IUser } from "@/interfaces";

export async function GET(req: Request, route: { params: { query: string } }) {
  try {
    const { query } = route.params;
    const users = await db.retrieveUsers(100);
    const filteredUsers = users.filter((user: IUser) =>
      user.username.includes(query)
    );
    return NextResponse.json(filteredUsers);
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
