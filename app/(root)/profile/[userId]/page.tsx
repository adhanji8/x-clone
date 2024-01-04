import ProfileBio from "@/components/profile/profile-bio";
import ProfileHero from "@/components/profile/profile-hero";
import Header from "@/components/shared/header";
import PostFeed from "@/components/shared/post-feed";
import { db } from "@/datastore";
import useAuthServer from "@/lib/useAuthServer";
import React from "react";

export default async function Page({ params }: { params: { userId: string } }) {
  const session = await useAuthServer();
  const user = await db.retrieveUserById(params.userId);

  return (
    <>
      <Header label={user.name} isBack />
      <ProfileHero user={user} />
      <ProfileBio user={user} userId={session.id} />
      <PostFeed userId={params.userId} user={user} />
    </>
  );
}
