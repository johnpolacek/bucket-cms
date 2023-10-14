"use client"
import React from "react"
import { useBucketName } from "../../hooks"
import { cn } from "../../ui/utils"

export function AdminFooter({ showAuthenticationWarning }: { showAuthenticationWarning: boolean }) {
  const { bucketName } = useBucketName()

  return bucketName ? (
    <footer className="fixed flex justify-end bottom-0 left-0 w-full z-20">
      <div className={cn("text-xs px-4 py-2 text-green-700 opacity-70 font-mono font-bold", showAuthenticationWarning ? "bg-green-200" : "bg-transparent")}>
        {showAuthenticationWarning ? "Authentication bypassed for localhost" : ""}
      </div>
      <div className="text-xs bg-[rgba(0,0,0,0.125)] px-4 py-2 text-gray-700 opacity-70 font-mono font-bold">{bucketName}</div>
    </footer>
  ) : null
}
