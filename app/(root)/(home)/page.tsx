import Auth from "@/components/auth";

export default function Page() {
  const user = false;
  if (!user) return <Auth />;

  return <div>page</div>;
}
