"use client";

import { IUser } from "@/interfaces";
import { Bell, Home, User } from "lucide-react";
import { MdOutlineExplore } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import SidebarItem from "./sidebar-item";
import SidebarPostButton from "./sidebar-post-button";
import SidebarAccount from "./sidebar-account";
import { sidebarItems as sideItems } from "./items";

interface Props {
  user: IUser;
}

export default function Sidebar({ user }: Props) {
  const sidebarItems = sideItems(user);

  return (
    <section className="sticky left-0 top-0 h-screen lg:w-[266px] w-fit flex-col items-center justify-between py-4 pl-2 hidden sm:flex">
      <div className="flex flex-col space-y-2">
        <div className="rounded-full h-14 w-14 p-4 flex items-center justify-center hover:bg-sky-300 hover:bg-opacity-10 cursor-pointer transition">
          <Image width={56} height={56} src={"/images/logo.svg"} alt="logo" />
        </div>

        {sidebarItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <SidebarItem {...item} />
          </Link>
        ))}
      </div>

      <SidebarAccount user={user} />
    </section>
  );
}
