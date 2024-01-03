import Auth from "@/components/auth";
import useAuthServer from "@/lib/useAuthServer";
import React from "react";
// import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";
import Sidebar from "@/components/sidebar/sidebar";
// import FollowBar from "@/components/shared/follow-bar";
// import Sidebar from "@/components/sidebar/sidebar";

interface Props {
  children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
  const user = await useAuthServer();

  if (!user?.id) {
    return (
      <div className="container h-screen mx-auto max-w-7xl">
        <Auth />
      </div>
    );
  }

  return (
    <div className="lg:container h-screen mx-auto lg:max-w-7xl">
      <div className="flex">
        <Sidebar user={user} />
        <div className="flex flex-1 border-x-[1px] border-neutral-800 lg:mx-4 ml-1">
          <div className="w-full">
            <NextTopLoader
              color="#2299DD"
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              showSpinner={false}
              easing="ease"
              speed={200}
              shadow="0 0 10px #2299DD,0 0 5px #2299DD"
            />
            {children}
            {/* <Toaster /> */}
          </div>
        </div>
        {/* <FollowBar /> */}
      </div>
    </div>
  );
};

export default Layout;
