"use client"
import { useState } from "react"

interface CLICommandCopyProps {
  commandText: string
}

const CLICommandCopy: React.FC<CLICommandCopyProps> = ({ commandText }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(commandText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center bg-black text-white py-3 px-4 rounded-xl w-full transition-all ease-in-out scale-105 hover:scale-110 border-8 cursor-pointer" onClick={handleCopy}>
      <span className="text-blue-500">$</span>
      <input type="text" value={commandText} readOnly className="cursor-pointer font-mono relative -left-[2px] text-center w-[240px] flex-grow outline-none bg-transparent" />
      <button className="text-xs text-white bg-blue-600 rounded px-2 py-1">{copied ? "Copied" : "Copy"}</button>
    </div>
  )
}

export default CLICommandCopy
