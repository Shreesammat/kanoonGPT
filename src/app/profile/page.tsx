"use client"

import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { ProfileNavbar } from "@/components/navbar/navbar";
import { Index } from "@/components/profileComp";

export default function ProfilePage() {
  const router = useRouter()
  const { session, isLoading } = useSessionContext()
  const user = session?.user
  const isAuthenticated = !!user
  console.log("user:", user)

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      toast.error("You must be logged in to view this page.");
      router.push("/auth");
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <main >
      <ProfileNavbar imageSrc={user?.user_metadata.avatar_url} userName={user?.user_metadata.name} email={user?.email} />
      <Index />
    </main>
  );
}



