"use client"
import React from "react"
import { useBucketName } from "../../hooks"

export function AdminFooter() {
  const { bucketName } = useBucketName()

  return (
    <footer className="fixed bottom-0 right-0">
      <div className="text-xs bg-gray-200 px-4 py-2 text-gray-700 opacity-70 font-mono font-bold">{bucketName}</div>
    </footer>
  )
}
