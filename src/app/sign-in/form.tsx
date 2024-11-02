"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Reset error state
    setError("");
    
    // Call signIn with email and password
    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,  // Ensures no automatic redirect
    });
  
    // Check response and handle success or error
    if (response?.ok) {
      console.log("Sign-in successful:", response);
      router.push("/"); // Redirect to homepage on successful sign-in
    } else {
      console.error("Sign-in failed:", response?.error);
      setError(response?.error || "Invalid credentials");
    }
  };
  

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Connecter</CardTitle>
        <CardDescription>Connecter a votre compte</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" className="w-full">
            Connecter
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
