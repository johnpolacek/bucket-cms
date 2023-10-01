import React, { useState } from "react"
import { Button } from "."
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons"
import { cn } from "./utils"

interface CodeBlockProps {
  code: string
  copy?: boolean
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, copy }) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (e: React.MouseEvent) => {
    e.preventDefault()
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopied(true)
        // Reset after 3 seconds
        setTimeout(() => setCopied(false), 3000)
      })
      .catch((err) => console.error("Copy failed: ", err))
  }

  return (
    <div className="w-full relative mt-8">
      {copy && (
        <Button className={cn("absolute top-1 right-1 z-10 scale-90", copied && "bg-green-600")} onClick={copyToClipboard}>
          {copied ? (
            <>
              <CheckIcon className="mr-2" /> Copied
            </>
          ) : (
            <>
              <CopyIcon className="mr-2" /> Copy
            </>
          )}
        </Button>
      )}

      <pre className="!text-[13px] !text-left !bg-gray-100 p-2 opacity-80 overflow-auto rounded">
        <code className="language-ts">{code}</code>
      </pre>
    </div>
  )
}
