"use client";
import { Toaster, toast } from "react-hot-toast";
import { clerkMiddleware } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const MinimalLandingPage = () => {
  const router = useRouter(); 
  const {isSignedIn,user}=useUser()


  const handleClick = () => {
   
   
    
    if (isSignedIn) {
      router.push("/feed");
    } else {
      toast.error("You must be signed in to access this page.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-md px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <span className="text-2xl font-bold text-blue-600">csNerds</span>
          </div>

          <div className="flex space-x-4">
            <SignedOut>
              <div className="flex space-x-4">
                <SignInButton mode="modal">
                  <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg">
                    Sign In
                  </button>
                </SignInButton>

                <SignUpButton mode="modal">
                  <button className="px-4 py-2 bg-white text-blue-600 font-medium rounded-lg border border-blue-600">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-grow flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            CS403 Notes Made <span className="text-blue-600">Simple</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            The ultimate note-taking app designed specifically for CS403 students. Organize, collaborate, and excel in your studies.
          </p>
          <button
            onClick={handleClick}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium"
          >
            Get Started 
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-400">© 2025 csNerds. All rights reserved.</p>
        </div>
      </footer>

      {/* Toast Container */}
      <Toaster position="top-center" />
    </div>
  );
};

export default MinimalLandingPage;