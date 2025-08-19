"use client"

import React, { useState } from "react"
import { PanelLeftOpen } from "lucide-react"

import { FileUpload } from "@/components/profileComp/file-upload"
import { PDFViewer } from "@/components/profileComp/pdf-viewer"
import { PDFSidebar } from "@/components/profileComp/pdf-sidebar"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { AnimatedCardsSection } from "./pastSessions"

export const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    setSidebarOpen(true)
  }


  return (
    <main className="flex flex-col gap-10 w-full" >
      <div className="bg-background">
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            {!selectedFile ? (
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-2xl">
                  <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">
                      KanoonGPT
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8">
                      Upload, view, and analyze PDF documents with AI-powered insights
                    </p>
                  </div>

                  <FileUpload
                    onFileSelect={handleFileSelect}
                    className="animate-fade-in"
                  />

                  <div className="mt-8 text-center">
                    <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <span>AI-powered analysis</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <span>Clauses extraction</span>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col p-4">
                {/* PDF Viewer Controls */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="h-9"
                          >
                            <PanelLeftOpen className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <div>
                      <h2 className="font-semibold">{selectedFile.name}</h2>
                      <p className="text-sm text-muted-foreground">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex space-x-4">
                  <div className="flex-1">
                    <PDFViewer file={selectedFile} className="h-full" />
                  </div>

                  {sidebarOpen && selectedFile && (
                    <div className="w-96 animate-slide-in-right">
                      <PDFSidebar
                        file={selectedFile}
                        isOpen={sidebarOpen}
                        onClose={() => setSidebarOpen(false)}
                        className="h-full"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {!selectedFile && <AnimatedCardsSection />}
    </main>

  )
}


