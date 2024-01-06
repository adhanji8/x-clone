import ProfileBio from "@/components/profile/profile-bio";
import ProfileHero from "@/components/profile/profile-hero";
import Header from "@/components/shared/header";
import PostFeed from "@/components/shared/post-feed";
import useAuthServer from "@/lib/useAuthServer";
import { retrieveUserById } from "@/services/userService";
import { Loader2 } from "lucide-react";
import React, { Suspense } from "react";

export default async function Page({ params }: { params: { userId: string } }) {
  const session = await useAuthServer();
  const user = await retrieveUserById(params.userId);
  if (!user || !session) return { error: "No user found" };

  return (
    <>
      <Header label={user.name} isBack />
      <ProfileHero user={user} />
      <ProfileBio user={user} userId={session.id} />
      <Suspense
        fallback={<Loader2 className="animate-spin text-sky-500 m-auto mt-2" />}
      >
        <PostFeed userId={params.userId} user={user} />
      </Suspense>
    </>
  );
}
