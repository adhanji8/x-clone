"use client";

import { ThemeToggleSwitch } from "@/components/shared/theme-toggle-switch";
import { IUser } from "@/interfaces";
import React from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRouter } from "next/navigation";

interface Props {
  user: IUser;
}

const SidebarAccount = ({ user }: Props) => {
  const router = useRouter();

  return (
    <>
      {/* MOBIE SIDEBAR ACCOUNT */}
      <div className="lg:hidden block">
        <div
          className="mt-6 lg:hidden rounded-full h-10 w-10 flex items-center justify-center bg-red-500 hover:bg-opacity-80 transition cursor-pointer"
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
              <div className="flex flex-col items-start dark:text-white">
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
        <PopoverContent className="flex flex-col items-center border-none rounded-2xl px-0 mb-3 bg-slate-50 dark:bg-neutral-900">
          <div className="font-semibold text-slate-600 dark:text-white cursor-pointer p-4 transition hover:bg-slate-400 hover:bg-opacity-10 w-full">
            <ThemeToggleSwitch />
          </div>
          <div
            className="font-semibold text-slate-600 dark:text-white cursor-pointer p-4 transition hover:bg-slate-400 hover:bg-opacity-10 w-full text-center"
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
