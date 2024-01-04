import { SessionStore, Session, FileStore } from "./sessionstore";

const sessionDb = new SessionStore(new FileStore("sessionstore.json"));

export { Session, sessionDb };
