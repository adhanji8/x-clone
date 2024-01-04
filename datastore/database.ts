import { IPost, IUser } from "@/interfaces";
import fs from "node:fs/promises";

interface IStorable<T> {
  add(entity: T): Promise<void>;
  // retrieveUser(id: string): Promise<IUser | null>;
  retrieveUserById(id: string): any; // TODO FIX
  retrieveUserByEmail(email: string): any; // TODO FIX
  retrieveUserByUsername(username: string): any; // TODO FIX
  retrievePostsByUsername(username: string): any; // TODO FIX
  retrievePostsByUserId(id: string): any; // TODO FIX
  retrieveUsers(quantity: number): any; // TODO FIX
  retrieveNotificationsByUserId(userId: string): any;
  retrievePostById(id: string): any; // TODO FIX
  insertPost(body: string, userId: string): any; // TODO FIX
}

export class Database {
  private store: IStorable<IUser>;
  constructor(store: IStorable<IUser>) {
    this.store = store;
  }

  async add(user: IUser) {
    this.store.add(user);
  }

  async insertPost(body: string, userId: string) {
    return this.store.insertPost(body, userId);
  }

  async retrievePostById(id: string) {
    return this.store.retrievePostById(id);
  }

  async retrieveUserById(id: string) {
    return this.store.retrieveUserById(id);
  }

  async retrieveUsers(limit: number) {
    return this.store.retrieveUsers(limit);
  }

  async retrieveUserByEmail(email: string) {
    return this.store.retrieveUserByEmail(email);
  }

  async retrieveUserByUsername(username: string) {
    return this.store.retrieveUserByUsername(username);
  }

  async retrievePostsByUsername(username: string) {
    return this.store.retrievePostsByUsername(username);
  }
  async retrievePostsByUserId(id: string) {
    return this.store.retrievePostsByUserId(id);
  }

  async retrieveNotificationsByUserId(id: string) {
    return this.store.retrieveNotificationsByUserId(id);
  }
}

export class JsonDatabase implements IStorable<IUser> {
  private filename: string;
  constructor(filename: string) {
    this.filename = filename;
  }

  async add(entity: IUser): Promise<void> {
    const data = JSON.parse(await fs.readFile(this.filename, "utf8"));
    data.push(entity);
    fs.writeFile(this.filename, JSON.stringify(data, null, 2));
  }

  async insertPost(body: string, userId: string): Promise<IPost> {
    const foundUser = await this.retrieveUserById(userId);
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
    const data = await this.getData();
    const userIndex = data.findIndex((user: IUser) => user.id === userId);
    if (foundUser != null) {
      data[userIndex] = foundUser;
      fs.writeFile(this.filename, JSON.stringify(data, null, 2));
    }
    return newPost;
  }

  async retrieveUserById(id: string): Promise<IUser | null> {
    const data = await this.getData();
    const user = data.find((user: IUser) => user.id === id);
    if (!user) return null;
    return user;
  }

  async retrieveUsers(limit: number): Promise<IUser[] | null> {
    const data = await this.getData();
    return data.slice(0, limit);
  }

  async retrievePostById(id: string): Promise<IPost | null> {
    const data = await this.getData();
    return data[0].posts![0];
  }

  async retrieveUserByEmail(email: string): Promise<IUser | null> {
    const data = await this.getData();
    const user = data.find((user: IUser) => user.email === email);
    if (!user) return null;
    return user;
  }

  async retrieveUserByUsername(username: string) {
    const data = await this.getData();
    const user = data.find((user: IUser) => user.username === username);
    if (!user) return null;
    return user;
  }

  async retrievePostsByUsername(username: string) {
    const data = await this.getData();
    const posts = data.find((user: IUser) => user.username === username)?.posts;
    if (!posts) return null;
    return posts;
  }

  async retrievePostsByUserId(id: string) {
    const data = await this.getData();
    const posts = data.find((user: IUser) => user.id === id)?.posts;
    if (!posts) return null;
    return posts;
  }

  async retrieveNotificationsByUserId(id: string) {
    const data = (await this.getData()) as any;
    const notifications = data.filter(
      (notification: any) => notification.userId === id
    );
    if (!notifications) return null;
    return notifications;
  }

  private async getData(): Promise<IUser[]> {
    return JSON.parse(await fs.readFile(this.filename, "utf8"));
  }
}
