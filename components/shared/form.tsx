"use client";

import { IPost, IUser } from "@/interfaces";
import { Dispatch, SetStateAction, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";

interface Props {
  placeholder: string;
  user: IUser;
  setPosts?: Dispatch<SetStateAction<IPost[]>>;
  postId?: string;
  isComment?: boolean;
}

const Form = ({ placeholder, user, isComment, postId }: Props) => {
  const router = useRouter();
  const [body, setBody] = useState("");

  const onSubmit = async () => {
    try {
      if (isComment) {
        const { data } = await axios.post("/api/comments", {
          body,
          userId: user.id,
          postId,
        });
        const newComment = {
          ...data,
          user,
          likes: 0,
          hasLiked: false,
        };
      } else {
        const { data } = await axios.post("/api/posts", {
          body,
          userId: user.id,
        });
        router.refresh();
      }
      setBody("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="border-b-[1px] border-slate-200 dark:border-neutral-800 px-5 py-2">
      <div className="flex flex-row gap-4">
        <Avatar>
          <AvatarImage src={user.profileImage} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>

        <div className="w-full">
          <textarea
            className="disabled:opacity-80 peer resize-none mt-3 w-full dark:bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 dark:text-white h-[50px]"
            placeholder={placeholder}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSubmit()}
          ></textarea>
          <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition" />

          <div className="mt-4 flex flex-row justify-end">
            <Button
              label={isComment ? "Reply" : "Post"}
              className="px-8"
              disabled={!body}
              onClick={onSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
