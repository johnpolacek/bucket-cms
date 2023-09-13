"use client"
import { signOut } from "next-auth/react"
import React from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { Bucket } from "../../../bucket"
import Header from "../ui/header"

function Demo({ user }: { user: string }) {
  const getInitials = (name: string): string =>
    name
      .split(" ")
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase()

  return (
    <div className="min-h-screen">
      <Header>
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
      </Header>
      <div className="w-full border opacity-50"></div>
      <Bucket view="ADMIN" hideViewSwitch={true} />
    </div>
  )
}

export default Demo
