import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sessionDb } from "@/datastore";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("session_token");
  if (!sessionToken) return null;

  cookieStore.delete("session_token");
  sessionDb.deleteSession(sessionToken.value);

  cookieStore.set("session_token", "", { expires: new Date() });

  return NextResponse.json({ success: true });
}
