import { IPost } from "./IPost";

export interface IUser {
  id: string;
  username: string;
  createdAt: string;
  followers: string[];
  following: number;
  isFollowing: boolean;
  name: string;
  email: string;
  password?: string;
  profileImage?: string;
  coverImage?: string;
  bio?: string;
  location?: string;
  posts?: IPost[];
  hasNewNotifications: boolean;
}
