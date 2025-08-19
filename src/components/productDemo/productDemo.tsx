
"use client"
import { Button } from "@/components/ui/button"
import { Bot, Plus } from "lucide-react"

export function ProductDemo() {
    return (
        <div className="min-h-screen bg-secondary/20 border flex flex-col items-center justify-center p-4">
            <div className="max-w-2xl w-full text-center space-y-8">

                <div className="space-y-2">
                    <h1 className="text-4xl font-bold text-foreground">Upload Your Legal Docs</h1>
                    <p className="text-secondary-foreground/90">Get Simple Summary with highlighted clauses</p>
                </div>
                <div className="relative min-h-52 bg-background/20 rounded-lg border-2 border-dashed border-foreground/20 p-12
                hover:border-foreground/40 transition-colors">

                    <div className="absolute left-8 top-1/2 -translate-y-1/2">
                        <svg width="80" height="40" viewBox="0 0 80 40"

                            fill="none">
                            <path
                                stroke="rgb(25, 229, 161)"
                                d="M5 20C15 5, 35 35, 50 20C60 10, 70 25, 75 15"
                                strokeWidth="3"
                                fill="none"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>

                    {/* Plus icon */}
                    <div className="absolute right-8 top-8">
                        <Plus className="w-6 h-6 text-chart-2" />
                    </div>

                    {/* Upload content */}
                    <div className="space-y-4">
                        <Button className="bg-chart-2 hover:bg-chart-2 text-background/90 hover:text-background px-8 py-3 rounded-full text-lg font-medium">
                            Upload PDF
                        </Button>
                        <div className="text-muted-foreground">
                            <p>or drop a file</p>
                        </div>
                    </div>
                </div>


                <div className="space-y-3">
                    <p className="text-foreground/90">
                        <span className="font-medium">No PDF?</span>
                        <br />
                        Try one of these:
                    </p>
                    <div className="flex justify-center gap-3">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8T1C8-3P3ziZMRV410KPYttVfnL-q7dStxw&s"
                            alt="Sample image 1"
                            className="w-15 h-15 cursor-pointer hover:border-chart-2/40  rounded-lg object-cover border-2 border-border"
                        />
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZlxxVRdZL3Mvf9AJDrcBsWv8ZAl8tQAzSNiR6wXIxFa3CaTWuf9thl0fw04-DOc8R5sY&usqp=CAU"
                            alt="Sample image 2"
                            className="w-15 h-15 cursor-pointer hover:border-chart-2/40  rounded-lg object-cover border-2 border-border"
                        />
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyrQJhsrrk8HVv9b_wY1y_6lI8-c_bMJUr3roovwErRXNneSkcTcGDfrHt34a2d3TLMys&usqp=CAU"
                            alt="Sample image 3"
                            className="w-15 h-15 cursor-pointer hover:border-chart-2/40  rounded-lg object-cover border-2 border-border"
                        />
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKYioTjJj0xvO3lnnusLSBCdQdcSyxh8CpD9SdWUekz5VZVsQKk9UGhyCAr8gIvYSM7Ko&usqp=CAU"
                            alt="Sample image 4"
                            className="w-15 h-15 cursor-pointer hover:border-chart-2/40  rounded-lg object-cover border-2 border-border"
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}


import { useState } from "react"

const tabs = ["Products", "People", "Animals", "Cars", "Graphics"]

export function ChatBotDemo() {
  const [activeTab, setActiveTab] = useState("Products")
  const [currentSlide, setCurrentSlide] = useState(0)

  return (
    <div className="min-h-screen py-20 bg-background flex flex-col items-center justify-center px-4">
      {/* Decorative element */}
      <div className="absolute top-8 right-8">
        <Bot className="text-chart-2" />
      </div>

      {/* Main content container */}
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-foreground py-20 text-center ">Interact with your Legal Assistant</h1>

        {/* Product showcase */}
        <div className="relative flex flex-col items-center justify-center gap-2">
          <div className="bg-secondary/20 border border-border 
          rounded-3xl p-12 flex items-center justify-center w-fit h-fit">
            <img
              src="https://www.midsane.tech/sarimgpt1.png"
              alt="Yellow leather handbag"
              className="max-w-full rounded-3xl max-h-80 object-fill"
            />
          </div>

          {/* Navigation dots and link */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex space-x-2">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentSlide === index ? "bg-chart-2" : "bg-foreground/60 hover:bg-foreground"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
