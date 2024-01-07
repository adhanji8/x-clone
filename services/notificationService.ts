import { INotification } from "@/interfaces";
import fs from "node:fs/promises";

const NOTIFICATION_DB_NAME = "fakeNotificationDatabase.json";

async function getNotificationData(filename: string): Promise<INotification[]> {
  return JSON.parse(await fs.readFile(filename, "utf8"));
}

export async function retrieveNotificationsByUserId(id: string) {
  const data = await getNotificationData(NOTIFICATION_DB_NAME);
  const notifications = data.filter(
    (notification) => notification.userId === id
  );
  if (!notifications) return null;
  return notifications;
}
