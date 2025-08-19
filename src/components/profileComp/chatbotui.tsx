"use client"
import type React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"
// import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { useSessionContext } from '@supabase/auth-helpers-react'
import {
  ArrowUp,
  X,
  Menu,
  LoaderIcon,
  Loader2,
  Download,
  EllipsisVertical,
  ArrowLeft,
  MousePointer,
} from "lucide-react"
import { cn } from "@/lib/utils"

import { ChatSession, downloadFile, formatTime, userStateFiltered } from '@/util/chatbotUtility'
import Image from "next/image"
import { ModeToggle } from "../ToggleTheme/toggleTheme"
import { useRouter } from "next/navigation"



export function ChatbotUI() {
  const [userState, setUserState] = useState<userStateFiltered>()
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([])
  const [activeSessionId, setActiveSessionId] = useState<number | null>(null)
  const [inputValue, setInputValue] = useState("")

  const router = useRouter()

  const [creatingUserMsg, setCreatingUserMsg] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [enlargedImageUrl, setEnlargedImageUrl] = useState<string | null | undefined>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [textareaRows, setTextareaRows] = useState(1)

  const { session, isLoading } = useSessionContext()
  const user = session?.user
  const isAuthenticated = !!user

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const activeSession = chatSessions.find((s) => s.id === activeSessionId)


  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textareaLineHeight = 20
    e.target.rows = 1
    const currentRows = Math.floor(e.target.scrollHeight / textareaLineHeight)
    e.target.rows = currentRows < 5 ? currentRows : 5
    setTextareaRows(currentRows < 5 ? currentRows : 5)
    setInputValue(e.target.value)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [activeSession?.messages, activeSessionId, creatingUserMsg])

  // --- TRPC MUTATIONS ---
  const commonOnSuccess = (newData: ChatSession['messages'][0]) => {
    setChatSessions(prev =>
      prev.map(session =>
        session.id === activeSessionId
          ? { ...session, messages: [...session.messages, newData] }
          : session
      )
    );
  };


  // const generateTextMutation = trpc.generateText.useMutation({
  //   onSuccess: commonOnSuccess,
  //   onError: (error) => toast.error("Failed to generate text: " + error.message),
  // });

  // --- CORE LOGIC ---
  // const sendMessage = async () => {
  //   if (!activeSessionId) {
  //     toast.error("No active chat session found. Please start a new chat.");
  //     return;
  //   }
  //   const content = inputValue.trim();
  //   if (content === "" || creatingUserMsg || isTyping) return;

  //   setCreatingUserMsg(true);
  //   setInputValue("");

  //   await createMessageMutation.mutateAsync({ content, fileUrl: "", role: "user", chatSessionId: activeSessionId });
  //   setIsTyping(true);
  //   setCreatingUserMsg(false);

  //   if (generationState === generationType.IMAGE) {
  //     await generateImageMutation.mutateAsync({ prompt: content, chatSessionId: activeSessionId });
  //   } else if (generationState === generationType.VIDEO) {
  //     await generateVideoMutation.mutateAsync({ prompt: content, chatSessionId: activeSessionId });
  //   } else {
  //     const sortedMessage = activeSession?.messages.sort((a, b) =>
  //       new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  //     ) ?? [];

  //     const appendedPrompt = sortedMessage.map(msg => ({
  //       role: msg.role,
  //       content: msg.content ?? "",
  //     })) ?? [];

  //     appendedPrompt.push({ role: "user", content: content });

  //     await generateTextMutation.mutateAsync({ prompt: appendedPrompt, chatSessionId: activeSessionId });
  //   }
  //   setIsTyping(false);
  // };

  const handleSubmit = () => {
    //sendMessage();
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }


  return (
    <>

      {/* The main UI is now protected by both `!isLoading` AND `isAuthenticated` */}
      {!isLoading && isAuthenticated && (
        <div className="flex h-dvh bg-background text-foreground">
          <div className="cursor-pointer z-20 absolute top-[9px] left-10">
            <svg width="25" height="25" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 20C0 12.5231 0 8.78461 1.60769 6C2.66091 4.17577 4.17577 2.66091 6 1.60769C8.78461 0 12.5231 0 20 0C27.4769 0 31.2154 0 34 1.60769C35.8242 2.66091 37.3391 4.17577 38.3923 6C40 8.78461 40 12.5231 40 20C40 27.4769 40 31.2154 38.3923 34C37.3391 35.8242 35.8242 37.3391 34 38.3923C31.2154 40 27.4769 40 20 40C12.5231 40 8.78461 40 6 38.3923C4.17577 37.3391 2.66091 35.8242 1.60769 34C0 31.2154 0 27.4769 0 20Z" fill="#00DC33"></path>
              <path fillRule="evenodd" clipRule="evenodd" d="M28.0441 7.60927C28.8868 6.80331 30.2152 6.79965 31.0622 7.58229L31.1425 7.66005L31.4164 7.94729C34.1911 10.9318 35.2251 14.4098 34.9599 17.8065C34.6908 21.2511 33.1012 24.4994 30.8836 27.0664C28.6673 29.6316 25.7084 31.6519 22.51 32.5287C19.2714 33.4164 15.7294 33.1334 12.6547 30.9629C10.0469 29.1218 9.05406 26.1465 8.98661 23.2561C7.52323 22.5384 5.98346 21.6463 4.36789 20.5615L3.941 20.2716L3.85006 20.206C2.93285 19.5053 2.72313 18.2084 3.39161 17.2564C4.06029 16.3043 5.36233 16.046 6.34665 16.6512L6.44134 16.7126L6.83024 16.9771C7.79805 17.6269 8.72153 18.1903 9.59966 18.6767C10.1661 16.6889 11.1047 14.7802 12.3413 13.207C14.1938 10.8501 16.9713 8.96525 20.374 9.24647C23.439 9.49995 25.7036 11.081 26.8725 13.3122C28.0044 15.4728 28.0211 18.0719 27.0319 20.307C26.0234 22.5857 23.976 24.484 21.0309 25.2662C18.9114 25.8291 16.4284 25.7905 13.6267 25.0367V25.0377C12.5115 24.7375 11.3427 24.323 10.1212 23.7846C9.8472 23.6638 9.60873 23.8483 10.1212 24.1686C11.5636 25.1924 13.5956 26.0505 14.1836 26.3385C14.4615 26.788 14.8061 27.1568 15.2011 27.4356C17.0188 28.7188 19.1451 28.9539 21.3396 28.3523C23.5743 27.7397 25.8141 26.2625 27.5514 24.2516C29.2873 22.2423 30.4065 19.8348 30.5909 17.4727C30.765 15.2439 30.1218 12.9543 28.1842 10.8736L27.9927 10.6731L27.9162 10.5906C27.1538 9.72748 27.2018 8.41516 28.0441 7.60927ZM20.0092 13.5651C18.6033 13.4489 17.1196 14.189 15.8013 15.8662C14.7973 17.1436 14.0376 18.8033 13.6503 20.5112C16.4093 21.4544 18.4655 21.4608 19.8942 21.0814C21.5481 20.6422 22.5399 19.6477 23.0172 18.5693C23.5137 17.4472 23.4628 16.2245 22.9813 15.3055C22.5369 14.4571 21.6422 13.7002 20.0092 13.5651Z" fill="#ffffff"></path>
            </svg>
          </div>

          <div className="cursor-pointer z-20 absolute top-[8px] right-2" > <ModeToggle /></div>
          <div onClick={() => setSidebarOpen((p) => !p)} className="cursor-pointer z-20 absolute top-2 left-2">
            {sidebarOpen ? <X /> : <Menu />}
          </div>

          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -350 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-80 fixed z-10 top-0 left-0 min-h-dvh py-10 bg-sidebar border-r border-sidebar-border flex flex-col"
              >
                {/* Chat History */}
                <ScrollArea className="flex-1 p-2">
                  <div className="flex justify-start px-1 gap-2 items-center">
                    <h2 className="my-2 " >Important Clauses </h2>
                    <MousePointer size={15} className="text-chart-2 " fill="green" />
                  </div>
                  <div className="flex flex-col gap-2 px-1 mt-5">
                    {["Clause 1", "Clause 2", "Clause 3"].map((clause, index) => (
                      <div className="flex flex-col gap-10" key={index}>
                        <h3 className="text-sm font-medium underline underline-offset-2 ">{clause}</h3>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                {/* User Profile */}
                <div className="p-4 border-t border-sidebar-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={userState?.pfp_url} alt={userState?.username} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                          {userState?.username?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{userState?.username}</span>
                    </div>

                    <div
                      onClick={() => router.push("/profile")}
                      className="flex gap-2 bg-secondary p-2 cursor-pointer rounded-full">
                      <ArrowLeft /> go back to profile
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col pt-10">
            <ScrollArea className="flex-1 p-4">
              <div className="max-w-3xl mx-auto space-y-6">
                {activeSession?.messages.map((message) => (
                  <div key={message.id} className={cn("flex gap-4", message.role === "user" ? "justify-end" : "justify-start")}>
                    {message.role === "assistant" && (<Avatar className="w-8 h-8 mt-1"><AvatarImage src={"/chatgpt.png"} width={32} height={32} /><AvatarFallback className="bg-primary text-primary-foreground text-sm">AI</AvatarFallback></Avatar>)}
                    <div className='flex flex-col gap-4'>
                      <div className={cn("max-w-[70%] min-w-[200px] rounded-2xl px-4 py-3 text-sm border border-border ", message.role === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-card text-card-foreground")}>
                        <p className="whitespace-pre-wrap w-full">{message.content} </p>
                        <p className={cn("text-xs mt-2 opacity-70", message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground")}>{formatTime(message.timestamp)}</p>
                      </div>
                      {message.fileUrl && message.fileUrl?.trim() !== "" && (
                        <div className='rounded-xl relative w-fit'>
                          <Image width={200} height={200} src={message.fileUrl || ""} alt="Generated" className="max-w-40 rounded-sm" />
                          <EllipsisVertical onClick={() => setEnlargedImageUrl(message.fileUrl)} size={25} className='absolute bottom-1 cursor-pointer p-1 bg-background/60 rounded-sm right-1' />
                        </div>
                      )}
                    </div>
                    {message.role === "user" && (<Avatar className="w-8 h-8 mt-1"><AvatarImage src={userState?.pfp_url} /><AvatarFallback className="bg-primary text-primary-foreground text-sm">{userState?.username?.charAt(0)}</AvatarFallback></Avatar>)}
                  </div>
                ))}
                {creatingUserMsg && <div className='w-full flex justify-end items-center'><Loader2 className=' animate-spin repeat-infinite' /></div>}
                {isTyping && (
                  <div className="flex gap-4 justify-start">
                    <Avatar className="w-8 h-8 mt-1"><AvatarImage src="/chatgpt.png" width={32} height={32} alt={userState?.username} /><AvatarFallback className="bg-primary text-primary-foreground text-sm">AI</AvatarFallback></Avatar>
                    <div className="bg-card border border-border rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            <div className="p-4">
              <div className="max-w-3xl mx-auto">

                <div className="relative flex justify-between gap-2 items-end rounded-2xl border border-border p-2">
                  <Textarea
                    ref={textareaRef}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="flex-1 min-h-[44px] max-h-32 w-[90%] resize-none bg-transparent border-none 
                    focus-visible:ring-0 focus-visible:ring-offset-0 text-sm scrollbar-hide"
                    rows={textareaRows}
                  />

                  <div className="flex gap-2 justify-end">
                    <Button onClick={handleSubmit} disabled={!inputValue.trim() || isTyping || creatingUserMsg} size="sm" className="w-8 h-8 p-0 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:border-primary border disabled:text-muted-foreground">
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}



      {/* AnimatePresence for enlarged image modal (can be outside the main div) */}
      <AnimatePresence>
        {enlargedImageUrl && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEnlargedImageUrl(null)} className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4 cursor-zoom-out">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} onClick={(e) => e.stopPropagation()} className="relative bg-card p-4 rounded-xl shadow-2xl max-w-4xl max-h-[90vh] flex flex-col gap-4 cursor-default">
              {(() => {
                const isImage = /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(enlargedImageUrl || "");
                if (isImage) {
                  return <Image width={700} height={700} src={enlargedImageUrl} alt="Enlarged view" className="object-contain w-full h-full max-w-full max-h-[calc(90vh-100px)]" />
                }
                // Video logic here
                return null;
              })()}
              <div className="flex justify-center items-center gap-4">
                <Button variant="outline" onClick={() => downloadFile(enlargedImageUrl)} className="flex items-center gap-2"><Download className="w-5 h-5" />Download</Button>
                <Button variant="secondary" onClick={() => setEnlargedImageUrl(null)} className="flex items-center gap-2"><X className="w-5 h-5" />Close</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export const SimpleLoader = () => {
  return (
    <div className='h-dvh w-screen fixed z-50 bg-background/70 flex gap-2 flex-col justify-center items-center'>
      <h1>Just a Second...</h1>
      <LoaderIcon className='animate-spin repeat-infinite ease-in' />
    </div>
  )
}