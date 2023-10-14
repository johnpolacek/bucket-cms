"use client"
import { signOut } from "next-auth/react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu"
import { Button } from "./button"

const UserDropdownMenu = ({ user }: { user: string }) => {
  const getInitials = (name: string): string =>
    name
      .split(" ")
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase()

  const localhostUserIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 scale-90 opacity-60">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div className="w-10 h-10 flex items-center justify-center rounded-full border">{user === "Localhost" ? localhostUserIcon : getInitials(user)}</div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Button className="ml-1" variant="ghost" onClick={() => signOut()}>
            Sign Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdownMenu
