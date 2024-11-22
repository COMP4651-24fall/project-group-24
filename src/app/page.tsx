'use client';

import { Button } from "@/components/ui/button";
import { Zap, Lightbulb } from "lucide-react";
import React, { useEffect } from "react";
import Image from "next/image";
import { SignInButton, useUser } from '@clerk/nextjs';
import { useRouter } from "next/navigation";

export default function StartPage() {
  const{ isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  // if the user signed in, show the chat page
  useEffect(() => {
    if (isLoaded && isSignedIn) { // Ensure authentication state is loaded
      router.push('/chatpage');
    }
  }, [isLoaded, isSignedIn, router]);

  // Display a loading indicator while authentication state is being resolved
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-lg">Loading...</p>
      </div>
    );
  }


  return (
    <div
      className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white flex flex-col items-center justify-center p-4 relative z-10"
    >
      <div className="max-w-4xl w-full text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-pulse">
          COMP4651 Final Project
        </h1>
        <p className="text-xl mb-8">Created by Victor, Sufian</p>
        
        <div className="flex justify-center items-center mb-8">
          <Zap className="w-12 h-12 mr-4 text-yellow-400 animate-bounce" />
          <div className="w-24 h-24 rounded-full border-4 border-blue-500 flex items-center justify-center">
            <Lightbulb className="w-12 h-12 text-yellow-400" />
          </div>
          <Zap className="w-12 h-12 ml-4 text-yellow-400 animate-bounce" />
        </div>
        
        <div className="mb-8">
          <Image
            src="/teslaIcon.webp"
            width={200}
            height={200}
            alt="Tesla Coil Illustration"
            className="mx-auto rounded-full bg-blue-700 p-4"
          />
        </div>
        
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Chat with Nikola Tesla
        </h2>
        
        <p className="mb-8 max-w-2xl mx-auto">
          Step into the world of one of historys greatest inventors. Engage in a conversation with an AI that embodies the brilliance and eccentricity of Nikola Tesla.
        </p>

        {/* Sign-In Button */}
        <SignInButton>
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            Start Chat
          </Button>
        </SignInButton>
      </div>
    </div>
  );
}