import { retrieveUsers } from "@/services/userService";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit") || "5";

    const users = await retrieveUsers(parseInt(limit));
    return NextResponse.json(users);
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
