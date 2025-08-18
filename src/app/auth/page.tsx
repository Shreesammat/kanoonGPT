"use client"
import { EmailAuthCard } from "@/components/EmailAuthDialog/emailAuthDialog";
import { Navbar } from "@/components/navbar/navbar";
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AuthPage() {
    const router = useRouter()
    const supabase = useSupabaseClient()
    const { session, isLoading } = useSessionContext()
    const user = session?.user
    console.log("user:", user)
    const isAuthenticated = !!user

    const handleSignIn = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) toast.error(error.message);
        else router.push("/profile");
    };

    const handleGoogleSignIn = async () => {
        const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
        if (error) toast.error(error.message);
        else router.push("/profile");
    };

    const handleSignUp = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) {
            toast.error(error.message);
        } else if (data.session === null) {
            toast.info("Please check your email to confirm your sign-up.");
        } else {
            toast.success("Account created successfully!");
            router.push("/profile");
        }
    };

    return <main className="min-h-screen" >
        <Navbar />
        <div className="flex justify-center items-center py-10">
            <EmailAuthCard onSignIn={handleSignIn} onSignUp={handleSignUp} onGoogleSignIn={handleGoogleSignIn} />
        </div>
    </main>
}