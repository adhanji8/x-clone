import { IUser } from "@/interfaces";
import { Bell, Home, User } from "lucide-react";
import { MdOutlineExplore } from "react-icons/md";

export const sidebarItems = (user: IUser) => [
  {
    label: "Home",
    path: "/",
    icon: Home,
  },
  {
    label: "Notifications",
    path: `/notifications/${user?.id}`,
    icon: Bell,
    notification: user?.hasNewNotifications,
  },
  {
    label: "Profile",
    path: `/profile/${user?.id}`,
    icon: User,
  },
  {
    label: "Explore",
    path: "/explore",
    icon: MdOutlineExplore,
  },
];
