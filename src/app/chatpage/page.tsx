'use client'; // Ensure this is at the top if using App Router

import { useState, useEffect, useRef } from 'react'
import { Send, Zap } from 'lucide-react'
import axios from 'axios'

// Resources
import teslaImage from '../../../public/teslaIcon.webp'
import background from '../../../public/teslaBackground.jpg'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { UserButton} from "@clerk/nextjs"

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function StartPage() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: "Greetings! I am Nikola Tesla, the master of electricity and innovation. How may I illuminate your day with the power of science?" 
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const prompt = input.trim()
    if (!prompt) return

    // Add user's message
    setMessages(prev => [...prev, { role: 'user', content: prompt }])
    setInput('')
    setIsLoading(true)

    try {
      const response = await axios.post('/api/chat', { prompt }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const completion = response.data.assistantMessage
      setMessages(prev => [...prev, { role: 'assistant', content: completion }])
    } catch (error: unknown) {
      const errorMsg = axios.isAxiosError(error) && error.response?.data?.error 
        ? error.response.data.error 
        : 'Sorry, something went wrong. Please try again later.'
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: errorMsg }
      ])
    } finally {
      setIsLoading(false)
    }

    // Scroll to latest message
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Auto-scroll to latest message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div 
      className="flex flex-col h-screen bg-cover bg-center bg-no-repeat relative z-0"
      style={{
        backgroundImage: `url(${background.src})`
      }}
    >
      {/* Overlay to darken the background */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* Chat container */}
      <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full p-4 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 bg-gray-900/80 backdrop-blur-sm p-4 rounded-t-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={teslaImage.src} alt="Nikola Tesla" />
              <AvatarFallback>NT</AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold text-white">Chat with Nikola Tesla</h1>
          </div>
          <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 bg-gray-900/80 backdrop-blur-sm rounded-b-lg p-4 mb-4 border border-gray-700 overflow-auto">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <Avatar className="h-8 w-8 mr-2 mt-1">
                  <AvatarImage src={teslaImage.src} alt="Nikola Tesla" />
                  <AvatarFallback>NT</AvatarFallback>
                </Avatar>
              )}
              <div 
                className={`p-3 rounded-lg max-w-[80%] ${
                  message.role === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800/90 text-white border border-gray-700'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          <div ref={scrollRef}></div>
        </ScrollArea>

        {/* Input area */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="text"
            placeholder="Ask Nikola Tesla something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-gray-900/80 backdrop-blur-sm text-white border-gray-700 placeholder:text-gray-400"
            disabled={isLoading}
            required
          />
          <Button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : <Send className="w-4 h-4" />}
          </Button>
          <UserButton />
        </form>
      </div>
    </div>
  )
}