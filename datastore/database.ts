import { IUser } from "@/interfaces";
import fs from "node:fs/promises";

interface IStorable<T> {
  add(entity: T): Promise<void>;
  // retrieveUser(id: string): Promise<IUser | null>;
  retrieveUserById(id: string): any; // TODO FIX
  retrieveUserByEmail(email: string): any; // TODO FIX
  retrieveUserByUsername(username: string): any; // TODO FIX
}

export class Database {
  private store: IStorable<IUser>;
  constructor(store: IStorable<IUser>) {
    this.store = store;
  }

  async add(user: IUser) {
    this.store.add(user);
  }

  async retrieveUserById(id: string) {
    return this.store.retrieveUserById(id);
  }

  async retrieveUserByEmail(email: string) {
    return this.store.retrieveUserByEmail(email);
  }

  async retrieveUserByUsername(username: string) {
    return this.store.retrieveUserByUsername(username);
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

  async retrieveUserById(id: string): Promise<IUser | null> {
    const data = await this.getData();
    const user = data.find((user: IUser) => user.id === id);
    if (!user) return null;
    return user;
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

  private async getData(): Promise<IUser[]> {
    return JSON.parse(await fs.readFile(this.filename, "utf8"));
  }
}
