"use client";

import { IUser } from "@/interfaces";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { sliceText } from "@/lib/utils";
import Button from "../ui/button";
import axios from "axios";
import useAuthClient from "@/lib/useAuthClient";

interface Props {
  user: IUser;
  setFollowing: React.Dispatch<React.SetStateAction<IUser[]>>;
}

const FollowUser = ({ user, setFollowing }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<IUser>(user);

  const router = useRouter();
  const { userId } = useParams();
  // const { data: session }: any = useSession();
  const { user: currentUser } = useAuthClient();

  const onFollow = async () => {
    try {
      setIsLoading(true);
      await axios.put("/api/follows", {
        userId: user.id,
        currentUserId: currentUser?.id,
      });
      if (userId === currentUser?.id) {
        setFollowing((prev) => [
          ...prev,
          {
            ...user,
            followers: [...user.followers, currentUser?.id],
          },
        ]);
      }
      setProfile((prev) => ({
        ...prev,
        followers: [...prev.followers, currentUser?.id],
      }));
      router.refresh();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const onUnfollow = async () => {
    try {
      setIsLoading(true);
      await axios.delete("/api/follows", {
        data: { userId: user.id, currentUserId: currentUser?.id },
      });
      if (userId === currentUser?.id) {
        setFollowing((prev) =>
          prev.filter((following) => following.id !== user.id)
        );
      }
      setProfile((prev) => ({
        ...prev,
        followers: prev.followers.filter(
          (follower) => follower !== currentUser?.id
        ),
      }));
      router.refresh();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const goToProfile = (evt: React.MouseEvent<HTMLSpanElement>) => {
    evt.stopPropagation();
    router.push(`/profile/${user.id}`);
  };

  return (
    <div className="flex gap-3 items-center justify-between cursor-pointer hover:bg-slate-300 hover:bg-opacity-10 transition py-2 px-3 rounded-md">
      <div className="flex gap-2 cursor-pointer">
        <Avatar onClick={goToProfile}>
          <AvatarImage src={profile.profileImage} />
          <AvatarFallback>{profile.name[0]}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col" onClick={goToProfile}>
          <p className="text-white font-semibold text-sm line-clamp-1">
            {profile.name}
          </p>
          <p className="text-neutral-400 text-sm line-clamp-1">
            {profile.username
              ? `@${sliceText(user.username, 20)}`
              : sliceText(user.email, 20)}
          </p>
        </div>
      </div>

      {profile.id !== currentUser?.id ? (
        profile.followers.includes(currentUser?.id) ? (
          <Button
            label={"Unfollow"}
            outline
            className="h-[30px] p-0 w-fit px-3 text-sm"
            disabled={isLoading}
            onClick={onUnfollow}
          />
        ) : (
          <Button
            label={"Follow"}
            className="h-[30px] p-0 w-fit px-3 text-sm"
            disabled={isLoading}
            onClick={onFollow}
          />
        )
      ) : null}
    </div>
  );
};

export default FollowUser;
