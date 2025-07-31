"use client";

import type React from "react";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useCreateUser } from "@/lib/client/mutations/userMutation";
import { SignupDTO, signupSchema } from "@/lib/client/zod-schemas/signupSchema";

interface SignUpPageProps {
  onBack?: () => void;
}

export function SignUpPage({ onBack }: SignUpPageProps) {
  const router = useRouter();

  const { mutate: createUser } = useCreateUser({
    onSuccess: () => {
      toast.success("Account created successfully!");
      form.reset();
      // Redirect to login or dashboard
      router.push("/login");
    },
    onError: (error) => {
      toast.error(`Failed to create account: ${error.message}`);
    },
  });

  const form = useForm<SignupDTO>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignupDTO) => {
    createUser({ userData: data });
  };

  const handleBack = () => {
    form.reset();
    if (onBack) {
      onBack();
    }
  };

  return (
    <div className="h-screen bg-white flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-sm space-y-8">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
            <span className="text-3xl font-bold text-white">₱</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-600 mt-2">Join Money App today</p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your full name"
                        className="mt-1 h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className="mt-1 h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Create a password"
                        className="mt-1 h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-lg"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </Form>

        <div className="pt-4">
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <button className="hover:text-emerald-600 transition-colors">
              Terms
            </button>
            <button className="hover:text-emerald-600 transition-colors">
              Privacy Policy
            </button>
            <button className="hover:text-emerald-600 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
