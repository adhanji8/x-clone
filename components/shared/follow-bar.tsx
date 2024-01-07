import React from "react";
import Button from "../ui/button";
import User from "./user";
import { IUser } from "@/interfaces";
import Link from "next/link";
import { retrieveUsers } from "@/services/userService";

const FollowBar = async () => {
  const users = await retrieveUsers(5);
  return (
    <div className="py-4 hidden lg:block w-[266px]">
      <div className="bg-slate-50 text-black dark:bg-neutral-900 rounded-xl ">
        <div className="flex items-center justify-between px-4 pt-4">
          <h2 className="text-black dark:text-white text-xl font-semibold">
            Who to follow
          </h2>
          <Link href="/explore">
            <Button
              secondary
              label={"See more"}
              className="h-[30px] p-0 w-fit px-3 text-sm"
            />
          </Link>
        </div>
        <div className="flex flex-col mt-4 mx-3 gap-4 pb-2">
          {users.map((user: IUser) => (
            <Link key={user.id} href={`/profile/${user.id}`}>
              <User user={user} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
