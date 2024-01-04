import { IUser } from "@/interfaces";
import fs from "node:fs/promises";
const DB_NAME = "fakedatabase.json";

async function getData(): Promise<IUser[]> {
  return JSON.parse(await fs.readFile(DB_NAME, "utf8"));
}

export async function add(entity: IUser): Promise<void> {
  const data = await getData();
  data.push(entity);
  fs.writeFile(DB_NAME, JSON.stringify(data, null, 2));
}

export async function retrieveUserById(id: string) {
  const data = await getData();
  const user = data.find((user: IUser) => user.id === id);
  if (!user) return null;
  return user;
}

export async function retrieveUsers(limit: number) {
  const data = await getData();
  return data.slice(0, limit);
}

export async function retrieveUserByEmail(email: string) {
  const data = await getData();
  const user = data.find((user: IUser) => user.email === email);
  if (!user) return null;
  return user;
}

export async function retrieveUserByUsername(username: string) {
  const data = await getData();
  const user = data.find((user: IUser) => user.username === username);
  if (!user) return null;
  return user;
}
