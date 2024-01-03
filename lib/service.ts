import { IUser } from "@/interfaces";
import axios from "axios";

async function getPosts(user: IUser) {
  return (
    await axios.get(
      `http://localhost:3000/api/posts?limit=20&username=${user.username}`
    )
  ).data;
}

async function getPost(postId: string) {
  return (await axios.get(`http://localhost:3000/api/posts/${postId}`)).data;
}

async function getComments(postId: string) {
  return (await axios.get(`http://localhost:3000/api/posts/${postId}/comments`))
    .data;
}

export { getPosts, getPost, getComments };
