"use client";

import React from "react";

import Link from "next/link";

import { Icon } from "@iconify/react";
import { sidebarItems as sideItems } from "@/components/sidebar/items";
import { IUser } from "@/interfaces";
import SidebarItem from "../sidebar/sidebar-item";

interface Props {
  user: IUser;
}

const BottomNav = ({ user }: Props) => {
  const sidebarItems = sideItems(user);

  return (
    <div
      className={`fixed bottom-0 w-full py-4 z-10 bg-zinc-100 dark:bg-zinc-950 border-t dark:border-zinc-800 border-zinc-200 shadow-lg sm:hidden`}
    >
      <div className="flex flex-row justify-around items-center bg-transparent w-full">
        {sidebarItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <SidebarItem {...item} />
          </Link>
        ))}
        {/* <Link href="/" className="flex items-center relative">
          <Icon icon="mingcute:home-5-line" width="32" height="32" />
        </Link>
        <Link href="/explore" className="flex items-center">
          <Icon icon="uil:search" width="32" height="32" />
        </Link>
        <Link href="/notifications" className="flex items-center">
          <Icon icon="mingcute:notification-line" width="32" height="32" />
        </Link>
        <Link href="/messages" className="flex items-center">
          <Icon icon="ic:outline-email" width="32" height="32" />
        </Link> */}
      </div>
    </div>
  );
};

export default BottomNav;
