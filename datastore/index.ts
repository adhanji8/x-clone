import { Database, JsonDatabase } from "./database";
import { FileStore, SessionStore, Session } from "./sessionstore";

const db = new Database(new JsonDatabase("fakedatabase.json"));
const sessionDb = new SessionStore(new FileStore("sessionstore.json"));

export { Session, db, sessionDb };
