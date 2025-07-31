"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SignUpPage } from "@/components/sign-up";
import { LoginPage } from "@/components/login";

type ViewMode = "home" | "login" | "signup";

export default function Login() {
  const [currentView, setCurrentView] = useState<ViewMode>("home");

  const handleLogin = () => {
    setCurrentView("login");
  };

  const handleSignup = () => {
    setCurrentView("signup");
  };

  const handleBackToHome = () => {
    setCurrentView("home");
  };

  if (currentView === "login") {
    return <LoginPage onBack={handleBackToHome} />;
  }

  if (currentView === "signup") {
    return <SignUpPage onBack={handleBackToHome} />;
  }

  return (
    <div className="h-screen bg-white flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-sm text-center space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-20 h-20 bg-emerald-600 rounded-2xl flex items-center justify-center">
            <span className="text-3xl font-bold text-white">₱</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Money App</h1>
        </div>
        <div className="space-y-4">
          <Button
            onClick={handleLogin}
            className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-lg"
          >
            Log In
          </Button>
          <Button
            onClick={handleSignup}
            variant="outline"
            className="w-full h-12 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-medium text-lg bg-transparent"
          >
            Sign Up
          </Button>
        </div>
        <div className="pt-8">
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <button className="hover:text-emerald-600 transition-colors underline decoration-emerald-600">
              Terms
            </button>
            <button className="hover:text-emerald-600 transition-colors underline decoration-emerald-600">
              Privacy Policys
            </button>
            <button className="hover:text-emerald-600 transition-colors underline decoration-emerald-600">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
