import { IUser } from ".";

export interface IComment {
  id: string;
  likes: number;
  hasLiked: boolean;
  body: string;
  createdAt: string;
  user: IUser;
}

export interface IPost {
  id: string;
  title: string;
  body: string;
  comments: IComment[];
  hasLiked: boolean;
  likes: number;
  user: IUser;
  createdAt: string;
}
