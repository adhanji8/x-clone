import { IPost } from "./IPost";

export interface IUser {
  id: string;
  username: string;
  name: string;
  email: string;
  password: string;
  profileImage?: string;
  posts: IPost[];
  hasNewNotifications: boolean;
}
