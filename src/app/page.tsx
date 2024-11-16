'use client'

import { useState } from 'react'
import { Send, Zap } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function Component() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Greetings! I am Nikola Tesla, the master of electricity and innovation. How may I illuminate your day with the power of science?" }
  ])
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }])
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: `You said: ${input}. How fascinating! Let's delve deeper into this electrical conundrum.` }])
      }, 1000)
      setInput('')
    }
  }

  return (
    <div 
      className="flex flex-col h-screen bg-cover bg-center bg-no-repeat before:content-[''] before:absolute before:inset-0 before:bg-black/40"
      style={{
        backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/360_F_575956256_LCs2MpDpnUgTG2WbVw1qRp5Bky3tpvOA.jpg-aTeRRKJQzbP780K1MATNuOlIOqwaER.jpeg')"
      }}
    >
      {/* Chat container */}
      <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full p-4 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 bg-gray-900/80 backdrop-blur-sm p-4 rounded-t-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Nikola Tesla" />
              <AvatarFallback>NT</AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold text-white">Chat with Nikola Tesla</h1>
          </div>
          <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 bg-gray-900/80 backdrop-blur-sm rounded-b-lg p-4 mb-4 border border-gray-700">
          {messages.map((message, index) => (
            <div key={index} className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.role === 'assistant' && (
                <Avatar className="h-8 w-8 mr-2 mt-1">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Nikola Tesla" />
                  <AvatarFallback>NT</AvatarFallback>
                </Avatar>
              )}
              <div className={`p-3 rounded-lg max-w-[80%] ${
                message.role === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800/90 text-white border border-gray-700'
              }`}>
                {message.content}
              </div>
            </div>
          ))}
        </ScrollArea>

        {/* Input area */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="text"
            placeholder="Ask Nikola Tesla something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-gray-900/80 backdrop-blur-sm text-white border-gray-700 placeholder:text-gray-400"
          />
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
