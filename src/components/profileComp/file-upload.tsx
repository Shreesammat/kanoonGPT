import React, { useCallback, useState } from "react"
import { Upload, FileText, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  onFileSelect: (file: File) => void
  className?: string
}

export function FileUpload({ onFileSelect, className }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    const pdfFile = files.find(file => file.type === "application/pdf")
    
    if (pdfFile) {
      setSelectedFile(pdfFile)
      onFileSelect(pdfFile)
    }
  }, [onFileSelect])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setSelectedFile(file)
      onFileSelect(file)
    }
  }, [onFileSelect])

  const clearFile = useCallback(() => {
    setSelectedFile(null)
  }, [])

  if (selectedFile) {
    return (
      <Card className={cn("animate-scale-in", className)}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFile}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card 
      className={cn(
        "transition-all duration-200 cursor-pointer group",
        isDragOver && "border-primary bg-accent/50 scale-105",
        "hover:shadow-medium hover:border-primary/50",
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <CardContent className="p-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <Upload className="h-8 w-8 text-primary" />
        </div>
        
        <div className="space-y-2 mb-6">
          <h3 className="text-lg font-semibold">Upload your PDF</h3>
          <p className="text-muted-foreground">
            Drag & drop your PDF file here, or click to browse
          </p>
        </div>
        
        <div className="space-y-4">
          <Button asChild className="relative overflow-hidden">
            <label>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              Choose File
            </label>
          </Button>
          
          <p className="text-xs text-muted-foreground">
            Supports: PDF files up to 10MB
          </p>
        </div>
      </CardContent>
    </Card>
  )
}