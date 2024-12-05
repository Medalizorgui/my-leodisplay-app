"use client";
import { Checkout } from "@/components/CheckOut";
import { SessionProvider } from "next-auth/react";

export default function CheckoutPage() {
  return(
    <SessionProvider>
   <Checkout />
   </SessionProvider>
  );
}