"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, ArrowRight, Sparkles, Zap, Heart, Star } from "lucide-react"

interface CardData {
  id: number
  title: string
  description: string
  date: string
  icon: React.ReactNode
  color: string
}

const mockData: CardData[] = [
  {
    id: 1,
    title: "Freelance Contract",
    description: "Join our interactive design session to explore new creative possibilities and enhance your skills.",
    date: "2024-03-15",
    icon: <Sparkles className="w-8 h-8" />,
    color: "text-blue-500",
  },
  {
    id: 2,
    title: "Remote Job Contract",
    description: "Discover the latest technological breakthroughs and network with industry leaders.",
    date: "2024-03-22",
    icon: <Zap className="w-8 h-8" />,
    color: "text-purple-500",
  },
  {
    id: 3,
    title: "Mortgage Paper",
    description: "A holistic approach to wellness featuring mindfulness sessions and healthy living tips.",
    date: "2024-03-28",
    icon: <Heart className="w-8 h-8" />,
    color: "text-green-500",
  },
  {
    id: 4,
    title: "Lease Papers",
    description: "Celebrating outstanding achievements and recognizing exceptional contributions to our community.",
    date: "2024-04-05",
    icon: <Star className="w-8 h-8" />,
    color: "text-yellow-500",
  },
  {
    id: 1,
    title: "Freelance Contract",
    description: "Join our interactive design session to explore new creative possibilities and enhance your skills.",
    date: "2024-03-15",
    icon: <Sparkles className="w-8 h-8" />,
    color: "text-blue-500",
  },
  {
    id: 2,
    title: "Remote Job Contract",
    description: "Discover the latest technological breakthroughs and network with industry leaders.",
    date: "2024-03-22",
    icon: <Zap className="w-8 h-8" />,
    color: "text-purple-500",
  },
  {
    id: 3,
    title: "Mortgage Paper",
    description: "A holistic approach to wellness featuring mindfulness sessions and healthy living tips.",
    date: "2024-03-28",
    icon: <Heart className="w-8 h-8" />,
    color: "text-green-500",
  },
  {
    id: 4,
    title: "Lease Papers",
    description: "Celebrating outstanding achievements and recognizing exceptional contributions to our community.",
    date: "2024-04-05",
    icon: <Star className="w-8 h-8" />,
    color: "text-yellow-500",
  },
  {
    id: 1,
    title: "Freelance Contract",
    description: "Join our interactive design session to explore new creative possibilities and enhance your skills.",
    date: "2024-03-15",
    icon: <Sparkles className="w-8 h-8" />,
    color: "text-blue-500",
  },
  {
    id: 2,
    title: "Remote Job Contract",
    description: "Discover the latest technological breakthroughs and network with industry leaders.",
    date: "2024-03-22",
    icon: <Zap className="w-8 h-8" />,
    color: "text-purple-500",
  },
  {
    id: 3,
    title: "Mortgage Paper",
    description: "A holistic approach to wellness featuring mindfulness sessions and healthy living tips.",
    date: "2024-03-28",
    icon: <Heart className="w-8 h-8" />,
    color: "text-green-500",
  },
  {
    id: 4,
    title: "Lease Papers",
    description: "Celebrating outstanding achievements and recognizing exceptional contributions to our community.",
    date: "2024-04-05",
    icon: <Star className="w-8 h-8" />,
    color: "text-yellow-500",
  },
  {
    id: 1,
    title: "Freelance Contract",
    description: "Join our interactive design session to explore new creative possibilities and enhance your skills.",
    date: "2024-03-15",
    icon: <Sparkles className="w-8 h-8" />,
    color: "text-blue-500",
  },
  {
    id: 2,
    title: "Remote Job Contract",
    description: "Discover the latest technological breakthroughs and network with industry leaders.",
    date: "2024-03-22",
    icon: <Zap className="w-8 h-8" />,
    color: "text-purple-500",
  },
  {
    id: 3,
    title: "Mortgage Paper",
    description: "A holistic approach to wellness featuring mindfulness sessions and healthy living tips.",
    date: "2024-03-28",
    icon: <Heart className="w-8 h-8" />,
    color: "text-green-500",
  },
  {
    id: 4,
    title: "Lease Papers",
    description: "Celebrating outstanding achievements and recognizing exceptional contributions to our community.",
    date: "2024-04-05",
    icon: <Star className="w-8 h-8" />,
    color: "text-yellow-500",
  },
  {
    id: 1,
    title: "Freelance Contract",
    description: "Join our interactive design session to explore new creative possibilities and enhance your skills.",
    date: "2024-03-15",
    icon: <Sparkles className="w-8 h-8" />,
    color: "text-blue-500",
  },
  {
    id: 2,
    title: "Remote Job Contract",
    description: "Discover the latest technological breakthroughs and network with industry leaders.",
    date: "2024-03-22",
    icon: <Zap className="w-8 h-8" />,
    color: "text-purple-500",
  },
  {
    id: 3,
    title: "Mortgage Paper",
    description: "A holistic approach to wellness featuring mindfulness sessions and healthy living tips.",
    date: "2024-03-28",
    icon: <Heart className="w-8 h-8" />,
    color: "text-green-500",
  },
  {
    id: 4,
    title: "Lease Papers",
    description: "Celebrating outstanding achievements and recognizing exceptional contributions to our community.",
    date: "2024-04-05",
    icon: <Star className="w-8 h-8" />,
    color: "text-yellow-500",
  },
]

function LoadingCard({ delay }: { delay: number }) {
  return (
    <Card className="h-full animate-pulse" style={{ animationDelay: `${delay}ms` }}>
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  )
}

function AnimatedCard({ card, index }: { card: CardData; index: number }) {
  return (
    <Card
      className="h-full group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md bg-card/50 backdrop-blur-sm"
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 150}ms both`,
      }}
    >
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <div className={`${card.color} group-hover:scale-110 transition-transform duration-300`}>{card.icon}</div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(card.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </div>
        </div>
        <h3 className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors duration-300">
          {card.title}
        </h3>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">{card.description}</p>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full  group-hover:text-foreground transition-all duration-300 bg-transparent"
          variant="outline"
        >
          Continue Chat
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
      </CardFooter>
    </Card>
  )
}

export function AnimatedCardsSection() {
  const [isLoading, setIsLoading] = useState(true)
  const [cards, setCards] = useState<CardData[]>([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setCards(mockData)
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="py-16 px-20 w-full mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Past Conversions
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Check / Review your past conversion and summary of all your legal docs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: 4 }, (_, index) => <LoadingCard key={index} delay={index * 200} />)
          : cards.map((card, index) => <AnimatedCard key={`${index}_${card.id}`} card={card} index={index} />)}
      </div>
    </section>
  )
}
