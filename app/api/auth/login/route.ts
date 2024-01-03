import { NextResponse } from "next/server";
import { db, sessionDb, Session } from "@/datastore";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const { email, password } = await request.json();
    const existingUser = await db.retrieveUserByEmail(email);
    if (!existingUser) {
      return NextResponse.json({ error: "No user found" }, { status: 400 });
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      return NextResponse.json({
        success: false,
        error: "Invalid Credentials",
      });
    }

    // set the expiry time as 3600ms (60min) after the current time
    const now = new Date();
    const expiresAt = new Date(+now + 3600 * 1000);

    const session = new Session(existingUser.id, expiresAt);
    const sessionId = await sessionDb.addSession(session);

    cookieStore.set("session_token", sessionId, { expires: expiresAt });

    delete existingUser["password"];
    return NextResponse.json({ success: true, user: existingUser });
  } catch (error) {
    console.log(error);
    NextResponse.json({ success: false, error: "Something went wrong" });
  }
}
