"use client"
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar/navbar";

export default function Home() {

  const router = useRouter()
  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen">
      {/* Header */}

      <Navbar />
      {/* Main Content */}
      <main className="flex-1 max-w-7xl justify-center items-center mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            No More Legal Headaches
            <br />
            Just Straightforward Summaries
          </h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            “Upload your contracts and let AI turn them into clear, simple summaries with key clauses highlighted and explained.”
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <Button
              onClick={() => router.push("/auth")}
              className="bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90 px-6 py-2">
              Get Started
            </Button>
            <Button
              onClick={() => router.push("/auth")}
              variant="outline"
              className="border-border cursor-pointer text-foreground px-6 py-2 bg-transparent"
            >
              Try Demo
            </Button>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="font-semibold">5.0</span>
            <span className="text-muted-foreground text-sm">from 50+ reviews</span>
          </div>
        </section>
      </main>
    </div>
  );
}
