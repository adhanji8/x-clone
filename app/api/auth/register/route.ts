import { IUser } from "@/interfaces";
import {
  add,
  retrieveUserByEmail,
  retrieveUserByUsername,
} from "@/services/userService";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { registerStep1Schema, registerStep2Schema } from "@/lib/validation";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const step = searchParams.get("step");

  if (step === "1") {
    const { email, name } = await request.json();
    registerStep1Schema.parse({ email, name });
    const existingEmail = await retrieveUserByEmail(email);
    if (existingEmail) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json({ success: true });
  } else if (step === "2") {
    const { email, username, name, password } = await request.json();
    registerStep2Schema.parse({ username, password });

    const isExistingUsername = await retrieveUserByUsername(username);

    if (isExistingUsername) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 14);

    const user: IUser = {
      id: randomUUID(),
      createdAt: "October 10, 2023",
      followers: [],
      following: 0,
      isFollowing: false,
      name: name,
      hasNewNotifications: false,
      email,
      username,
      password: hashedPassword,
      posts: [],
    };

    await add(user);
    return NextResponse.json({ success: true, user });
  }
}
