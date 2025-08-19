import type { Metadata } from "next";

import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { ThemeProvider } from "@/providers/ThemeProvider";
import { TrpcProviders } from "@/providers/trpcProvider";
import { Toaster } from "@/components/ui/sonner";
import SupabaseProvider from "@/providers/supabaseProvider";



export const metadata: Metadata = {
  title: "KanoonGPT",
  description: "Your AI-powered legal assistant",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Baskervville:ital,wght@0,400..700;1,400..700&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Sora:wght@100..800&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${openSans.variable} antialiased`}
      >
        <TrpcProviders>
          <SupabaseProvider session={session}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
            <Toaster position="top-center" richColors />
          </SupabaseProvider>
        </TrpcProviders>
      </body>
    </html>
  );
}