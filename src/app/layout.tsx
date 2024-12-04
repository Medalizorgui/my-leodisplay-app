// src/app/layout.tsx

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavbarClient from "./NavBarClient";
import { Footer } from "@/components/Footer";




// Root layout (Server Component)
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        {/* Navbar is now handling the session */}
        <NavbarClient/>
        {children}
        <Footer/>
        </body>
    </html>
  );
}
