import './globals.css'

import Link from "next/link";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import {
  Home,
  Wallet,
  Users2
} from 'lucide-react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-6 px-2 sm:py-5 mt-12">
              <HoverCard>
                <HoverCardTrigger asChild className="">
                  <Link href="/"><Home className="h-5 w-5" /></Link>
                </HoverCardTrigger>
                <HoverCardContent side="right" sideOffset="1" className="z-auto w-auto py-1 px-2">
                  <h4 className="text-sm font-semibold text-center">Home</h4>
                </HoverCardContent>
              </HoverCard>

              <HoverCard>
                <HoverCardTrigger asChild>
                  <Link href="/policies"><Wallet className="h-5 w-5" /></Link>
                </HoverCardTrigger>
                <HoverCardContent side="right" sideOffset="1" className="z-auto w-auto py-1 px-2">
                  <h4 className="text-sm font-semibold text-center">Policies</h4>
                </HoverCardContent>
              </HoverCard>

              <HoverCard>
                <HoverCardTrigger asChild>
                  <Link href="/customers"><Users2 className="h-5 w-5" /></Link>
                </HoverCardTrigger>
                <HoverCardContent side="right" sideOffset="1" className="z-auto w-auto py-1 px-2">
                  <h4 className="text-sm font-semibold text-center">Customers</h4>
                </HoverCardContent>
              </HoverCard>
            </nav>
          </aside>
        {children}
        </body>
    </html>
  );
}
