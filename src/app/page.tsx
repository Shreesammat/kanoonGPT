"use client"
import { Button } from "@/components/ui/button";
import { Bookmark, FileText, MessageSquare, Star, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar/navbar";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Home() {

  const router = useRouter()
  return (
    <div className="bg-background text-foreground gap-0 flex flex-col min-h-screen">
      {/* Header */}
      <Navbar />
      {/* Main Content */}
      <main className="flex-1 max-w-7xl justify-center items-center mx-auto px-4 sm:px-6 lg:px-8 pt-10 flex flex-col">
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
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
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

        </section>

      </main>
      <section className="flex w-full flex-col sm:flex-row items-center gap-10 sm:gap-0 sm:items-end mb-10 justify-around" >

        <Card className="sm:w-[18%] rounded-xl sm:h-52 " >
          <CardHeader className="h-full flex flex-col justify-center items-start" >
            <CardTitle>  <FileText /></CardTitle>
            <CardDescription className="text-accent-foreground mt-2" >Automatically detect and surface the most important clauses in your legal documents.</CardDescription>
          </CardHeader>
        </Card>


        <Card className="sm:w-[13%] rounded-xl sm:h-44 " >
          <CardHeader className="h-full flex flex-col justify-center items-start" >
            <CardTitle>  <Upload /></CardTitle>
            <CardDescription className="text-accent-foreground mt-2" >Easily upload contracts, agreements, or any legal text in a few clicks.</CardDescription>
          </CardHeader>
        </Card>

        <Card className="sm:w-[10%] rounded-xl sm:h-38 " >
          <CardHeader className="h-full flex flex-col justify-center items-start" >
            <CardTitle>  <Star /></CardTitle>
            <CardDescription className="text-accent-foreground mt-2" >Rate your experience with our document summaries.</CardDescription>

          </CardHeader>
        </Card>


        <Card className="sm:w-[13%] rounded-xl sm:h-38 " >
          <CardHeader className="h-full flex flex-col justify-center items-start" >
            <CardTitle>  <Bookmark /></CardTitle>
            <CardDescription className="text-accent-foreground mt-2" >Organize and access all your legal document summaries in one place.</CardDescription>
          </CardHeader>
        </Card>

        <Card className="sm:w-[18%] rounded-xl sm:h-52 " >
          <CardHeader className="h-full flex flex-col justify-center items-start" >
            <CardTitle>  <MessageSquare /></CardTitle>
            <CardDescription className="text-accent-foreground mt-2" >
              Get clear, plain-English summaries of complex legal documents instantly.
            </CardDescription>
          </CardHeader>
        </Card>

      </section>
    </div>
  );
}



