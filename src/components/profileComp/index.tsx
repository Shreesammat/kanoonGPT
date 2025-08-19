"use client"
import React from "react"

import { AnimatedCardsSection } from "./pastSessions"
import { Textarea } from "../ui/textarea"

export const Index = () => {
  return (
    <main className="flex flex-col pt-20 gap-10 w-full" >
      <TextareaUploadCard />
      <AnimatedCardsSection />
    </main>

  )
}

import { motion } from "framer-motion"
import { UploadCloud, FileText, X } from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"



import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

function TextareaUploadCard() {
  const [text, setText] = React.useState("")
  const [file, setFile] = React.useState<File | null>(null)
  const [dragActive, setDragActive] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const router = useRouter()

  const MAX_CHARS = 3000

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (f) setFile(f)
  }

  function openFilePicker() {
    inputRef.current?.click()
  }

  function clearFile() {
    setFile(null)
    if (inputRef.current) inputRef.current.value = ""
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const f = e.dataTransfer.files?.[0]
    if (f) setFile(f)
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
    if (!dragActive) setDragActive(true)
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const chars = text.length
  const percentage = Math.min(100, Math.round((chars / MAX_CHARS) * 100))

  const handleUpload = () => {
    //upload file and text in db and vector db 
    router.push("chat/12")

  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="w-full max-w-3xl mx-auto"
    >
      <Card className="border-muted/60 my-10 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Compose & Upload</CardTitle>
          <CardDescription>
            Drop your Legal file or paste your content below. You can attach one file (PDF/IMG/DOC) and write up to {MAX_CHARS.toLocaleString()} characters.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Upload zone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={openFilePicker}
            role="button"
            aria-label="Upload file"
            className={[
              "flex items-center gap-4 rounded-2xl border-2 border-dashed p-4",
              "transition-all cursor-pointer",
              dragActive
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/20 hover:border-primary/50",
            ].join(" ")}
          >
            <div className="shrink-0">
              <UploadCloud className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Drag & drop a file here</p>
              <p className="text-xs text-muted-foreground">
                Or click to choose. Max ~10MB (configurable). Common formats supported.
              </p>
            </div>
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Selected file preview */}
          {file && (
            <div className="flex items-center justify-between rounded-xl border bg-muted/30 px-3 py-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <div className="leading-tight">
                  <p className="text-sm font-medium line-clamp-1">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={clearFile} aria-label="Remove file">
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Big Textarea */}
          <div className="space-y-2">
            <label htmlFor="big-text" className="text-sm font-medium">
              Your content
            </label>
            <Textarea
              id="big-text"
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
              placeholder="Type or paste here..."
              className="min-h-[120px] resize-y rounded-2xl"
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {chars.toLocaleString()} / {MAX_CHARS.toLocaleString()} characters
              </span>
              <div className="h-1 w-40 rounded-full bg-muted">
                <div
                  className="h-1 rounded-full bg-primary"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-end gap-2">
          <Button variant="outline" onClick={() => { setText(""); clearFile() }}>Reset</Button>
          <Button onClick={handleUpload}>Upload</Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
