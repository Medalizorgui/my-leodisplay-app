"use client";  // Ensure this is a Client Component

import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/navbar";  // Assuming the Navbar component is located here

const NavbarClient = () => {
  return (
    <SessionProvider>
      <Navbar />
    </SessionProvider>
  );
};

export default NavbarClient;
