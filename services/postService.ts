import { IPost, IUser } from "@/interfaces";
import fs from "node:fs/promises";
import { retrieveUserById } from "./userService";
const DB_NAME = "fakedatabase.json";

async function getData(): Promise<IUser[]> {
  return JSON.parse(await fs.readFile(DB_NAME, "utf8"));
}

export async function insertPost(body: string, userId: string): Promise<IPost> {
  const foundUser = await retrieveUserById(userId);
  const newPost = {
    id: crypto.randomUUID(),
    createdAt: "October 15, 2023 05:35:32",
    title: body,
    body: body,
    followers: [],
    following: [],
    isFollowing: false,
    comments: 0,
    hasLiked: false,
    likes: 0,
    user: {
      id: "0b7dc03f-eada-4167-a11e-17528eb31c4c",
      name: "john",
      username: "john123",
      createdAt: "October 15, 2023 05:35:32",
      hasNewNotifications: false,
      isFollowing: false,
      following: 0,
      comments: 0,
      followers: [],
      email: "john123@gmail.com",
      profileImage:
        "https://res.cloudinary.com/demo/image/twitter/1330457336.jpg",
    },
  };
  foundUser?.posts!.push(newPost);
  const data = await getData();
  const userIndex = data.findIndex((user: IUser) => user.id === userId);
  if (foundUser != null) {
    data[userIndex] = foundUser;
    fs.writeFile(DB_NAME, JSON.stringify(data, null, 2));
  }
  return newPost;
}

export async function retrievePostById(id: string): Promise<IPost | null> {
  const data = await getData();
  return data[0].posts![0];
}

export async function retrievePostsByUsername(username: string) {
  const data = await getData();
  const posts = data.find((user: IUser) => user.username === username)?.posts;
  if (!posts) return null;
  return posts;
}

export async function retrievePostsByUserId(id: string) {
  const data = await getData();
  const posts = data.find((user: IUser) => user.id === id)?.posts;
  if (!posts) return null;
  return posts;
}
