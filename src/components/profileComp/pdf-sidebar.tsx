import React, { useState } from "react"
import { MessageCircle, FileText, Bot, X, Send } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface PDFSidebarProps {
  file: File
  isOpen: boolean
  onClose: () => void
  className?: string
}

export function PDFSidebar({ file, isOpen, onClose, className }: PDFSidebarProps) {

  const [chatMessage, setChatMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<Array<{
    id: number
    type: 'bot' | 'user'
    message: string
    timestamp: Date
  }>>([
    {
      id: 1,
      type: 'bot' as const,
      message: "Hi! I'm here to help you analyze this PDF. You can ask me questions about the content, request summaries, or get explanations of complex topics.",
      timestamp: new Date()
    }
  ])

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return

    const userMessage = {
      id: chatHistory.length + 1,
      type: 'user' as const,
      message: chatMessage,
      timestamp: new Date()
    }

    const botResponse = {
      id: chatHistory.length + 2,
      type: 'bot' as const,
      message: "I understand you're asking about the PDF content. This is a demo response - in a real implementation, I would analyze the actual PDF content and provide relevant answers.",
      timestamp: new Date()
    }

    setChatHistory(prev => [...prev, userMessage, botResponse])
    setChatMessage("")
  }

  const extractedText = `This is a sample of extracted text from the PDF. In a real implementation, this would contain the actual text content from the uploaded PDF file. The text would be searchable and could be used for AI analysis and summarization.

Key topics identified:
• Document structure and layout
• Content analysis capabilities  
• AI-powered insights
• Text extraction methods`

  if (!isOpen) return null

  return (
    <Card className={`h-full flex flex-col ${className}`}>
      <CardHeader className="border-b p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Document Analysis</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <Tabs defaultValue="chat" className="h-full flex flex-col">
          <TabsList className="grid w-fit grid-cols-2 gap-1 m-4 mb-0">
            <TabsTrigger value="chat" className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span>Chat</span>
            </TabsTrigger>
            <TabsTrigger value="text" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Summary</span>
            </TabsTrigger>
        
          </TabsList>

          <TabsContent value="chat" className="flex-1 flex flex-col m-4 mt-4 space-y-4">
            <ScrollArea className="flex-1 pr-3">
              <div className="space-y-4">
                {chatHistory.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      {message.type === 'bot' && (
                        <div className="flex items-center space-x-2 mb-2">
                          <Bot className="h-4 w-4 text-primary" />
                          <span className="text-xs font-medium text-primary">AI Assistant</span>
                        </div>
                      )}
                      <p className="text-sm leading-relaxed">{message.message}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="flex items-end space-x-2">
              <Textarea
                placeholder="Ask about the PDF content..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="resize-none"
                rows={2}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!chatMessage.trim()}
                className="shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="text" className="flex-1 m-4 mt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Extracted Text</h3>
                <Badge variant="secondary">
                  {file.name.split('.')[0]}
                </Badge>
              </div>
              
              <Separator />
              
              <ScrollArea className="h-96">
                <div className="text-sm leading-relaxed whitespace-pre-line text-muted-foreground">
                  {extractedText}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

       
        </Tabs>
      </CardContent>
    </Card>
  )
}