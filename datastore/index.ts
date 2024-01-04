import { Database, JsonDatabase } from "./database";
import { FileStore, SessionStore, Session } from "./sessionstore";

const db = new Database(new JsonDatabase("fakedatabase.json"));
const sessionDb = new SessionStore(new FileStore("sessionstore.json"));
const notificationDb = new Database(
  new JsonDatabase("fakeNotificationDatabase.json")
);

export { Session, db, sessionDb, notificationDb };
