import { IUser } from ".";

export interface IPost {
  id: string;
  title: string;
  body: string;
  comments: number;
  hasLiked: boolean;
  likes: number;
  user: IUser;
  createdAt: string;
}
