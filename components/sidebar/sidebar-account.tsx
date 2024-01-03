"use client";

import { IUser } from "@/interfaces";
import React from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Loader2, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  user: IUser;
}

const SidebarAccount = ({ user }: Props) => {
  const router = useRouter();
  // We can avoid the loading state if we pass user from server
  // const { user, status }: any = useAuthClient();

  // if (status == "loading")
  //   return (
  //     <div className="flex items-center justify-center">
  //       <Loader2 className="animate-spin text-sky-500" />
  //     </div>
  //   );

  return (
    <>
      {/* MOBIE SIDEBAR ACCOUNT */}
      <div className="lg:hidden block">
        <div
          className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-red-500 hover:bg-opacity-80 transition cursor-pointer"
          onClick={async () => {
            await fetch("/api/auth/logout", { method: "POST" });
            router.refresh();
          }}
        >
          <RiLogoutCircleLine size={24} color="white" />
        </div>
      </div>

      {/* DESKTOP SIDEBAR ACCOUNT */}
      <Popover>
        <PopoverTrigger className="w-full rounded-full hover:bg-slate-300 hidden lg:block cursor-pointer hover:bg-opacity-10 px-4 py-2 transition">
          <div className="flex justify-between items-center gap-2">
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage src={user?.profileImage} />
                <AvatarFallback>{user?.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-white">
                <p>{user?.name}</p>
                {user?.username ? (
                  <p className="opacity-40">@{user?.username}</p>
                ) : (
                  <p className="opacity-40">Manage account</p>
                )}
              </div>
            </div>
            <MoreHorizontal size={24} color="white" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="border-none rounded-2xl px-0 mb-3 bg-neutral-900 hover:bg-slate-400 hover:bg-opacity-10">
          <div
            className="font-bold text-white cursor-pointer p-4 transition"
            onClick={async () => {
              await fetch("/api/auth/logout", { method: "POST" });
              router.refresh();
            }}
          >
            Log out {user?.username ? `@${user?.username}` : user?.name}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default SidebarAccount;
