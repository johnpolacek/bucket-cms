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

  return (
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
  )
}

export default UserDropdownMenu
