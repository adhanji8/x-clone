import fs from "node:fs/promises";
import { existsSync } from "node:fs";

interface IStorableSession {
  add(session: Session): Promise<string>;
  delete(sessionId: string): Promise<void>;
  retrieve(sessionId: string): Promise<Session | null>;
}

export class FileStore implements IStorableSession {
  private filename: string;
  constructor(filename: string) {
    this.filename = filename;
  }
  async add(session: Session): Promise<string> {
    if (!existsSync(this.filename)) {
      await fs.writeFile(this.filename, JSON.stringify({}, null, 2));
    }
    const sessionStore = JSON.parse(await fs.readFile(this.filename, "utf8"));
    const sessionId = crypto.randomUUID();
    sessionStore[sessionId] = session;
    await fs.writeFile(this.filename, JSON.stringify(sessionStore, null, 2));
    return sessionId;
  }
  async delete(sessionId: string): Promise<void> {
    const sessionStore = JSON.parse(await fs.readFile(this.filename, "utf8"));
    delete sessionStore[sessionId];
  }
  async retrieve(sessionId: string): Promise<Session | null> {
    const sessionStore = JSON.parse(await fs.readFile(this.filename, "utf8"));
    const foundSession: { userId: string; expiresAt: Date } | null =
      sessionStore[sessionId];
    if (!foundSession) return null;
    // Deserialize Session
    return new Session(foundSession.userId, foundSession.expiresAt);
  }
}

export class SessionStore {
  private store;
  constructor(store: IStorableSession) {
    this.store = store;
  }

  // Adds session to session store and returns sid
  async addSession(session: Session) {
    const sessionId = await this.store.add(session);
    return sessionId;
  }

  async deleteSession(sessionId: string) {
    await this.store.delete(sessionId);
  }

  async getSession(sessionId: string) {
    const session = await this.store.retrieve(sessionId);
    if (!session) return null;
    return session;
  }
}
export class Session {
  private userId;
  private expiresAt;

  constructor(userId: string, expiresAt: Date) {
    this.userId = userId;
    this.expiresAt = expiresAt;
  }

  getUserId() {
    return this.userId;
  }

  getExpiry() {
    return this.expiresAt;
  }

  isExpired() {
    return this.expiresAt < new Date();
  }
}
