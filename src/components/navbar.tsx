'use client';  // Mark this component as a client-side component

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { ShoppingCart, LogIn, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from 'next/navigation'; // Import useRouter

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter(); // Initialize useRouter

  const handleLoginClick = () => {
    router.push('/sign-in'); // Redirect to the sign-in page
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      <Link href="/" className="text-xl font-bold text-[hsl(47.9,95.8%,53.1%)]">
        LeoDisplay
      </Link>
      <div className="flex items-center space-x-4">
        {session ? (
          <>
            <Link href="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-[hsl(47.9,95.8%,53.1%)] text-[hsl(47.9,95.8%,53.1%)]">
                  Account
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Button
            onClick={handleLoginClick} // Navigate to the sign-in page
            style={{ backgroundColor: "hsl(47.9, 95.8%, 53.1%)", color: "#fff" }}
          >
            <LogIn className="mr-2 h-4 w-4" />
            Log in
          </Button>
        )}
      </div>
    </nav>
  );
}
