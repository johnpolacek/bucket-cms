"use client"
import { signOut } from "next-auth/react"
import React from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import Link from "next/link"
import Admin from "../../bucket/admin"

function Demo({ user }: { user: string }) {
  const getInitials = (name: string): string =>
    name
      .split(" ")
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase()

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex justify-between items-center w-full px-8 py-4 border-b bg-white">
        <div>
          <Link href="/">Your App</Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <div className="w-10 h-10 flex items-center justify-center rounded-full border">{getInitials(user)}</div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Button className="ml-1" variant="ghost" onClick={() => signOut()}>
                Sign Out
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main className="flex flex-col items-center justify-center py-12">
        <Admin />
      </main>
    </div>
  )
}

export default Demo
