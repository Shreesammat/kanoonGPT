"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar/navbar";
import { ArrowSVg, CurvedLine } from "@/components/svg/svg";
import { Footer } from "@/components/footer/footer";
import { ChatBotDemo, ProductDemo } from "@/components/productDemo/productDemo";
import { Scale } from "lucide-react";


export default function Home() {

  const router = useRouter()
  return (
    <main className="newsreader-kanoongpt" >
      <div className="bg-background text-foreground gap-0 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 max-w-7xl justify-center items-center mx-auto px-4 sm:px-6 lg:px-8 pt-10 flex flex-col">
          <section className="text-center relative mb-12">
            <h1 className="text-5xl font-medium sm:text-6xl mb-4 leading-tight">
              Meet Your <br />Legal Guide
            </h1>
            <p className="text-lg text-muted-foreground mb-6 mt-2 max-w-2xl mx-auto">
              No More Legal Headaches
              Just Straightforward Summaries
            </p>
            <ArrowSVg />
            <CurvedLine />
            <Button
            onClick={() => router.push("/auth")}
            variant="default"
            size={'lg'}
            className="border-chart-2/20 border
            hover:text-background mt-2 flex justify-center m-auto items-center
            hover:bg-chart-2/80 ease-in duration-75  cursor-pointer text-foreground px-6 py-2 bg-transparent"
          >
            <p className="mt-" >Get Started</p> <Scale />
          </Button>

          
          </section>
        </main>


      </div>
      <ProductDemo />
      <ChatBotDemo />
      <Footer />
    </main>
  );
}



