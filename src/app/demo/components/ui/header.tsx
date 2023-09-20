"use client"
import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./button"

const Header = ({ children }: { children: React.ReactElement }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="px-4 py-2 flex flex-wrap justify-between items-center">
      <Link href="/">
        <div className="flex items-center cursor-pointer pl-4">
          <div className="h-[54px] w-[54px] my-2 flex items-center overflow-hidden relative -top-[2px] mr-[2px]">
            <Image src="/bucket-cms-logo.png" width={54} height={54} alt="Bucket CMS Logo" />
          </div>
          <h2 className="font-extrabold text-2xl text-blue-600 sm:text-2xl">
            Bucket <span className="font-bold text-lg relative -left-[2px] -top-px text-blue-400">CMS</span>
          </h2>
        </div>
      </Link>
      <div className="flex items-center sm:hidden gap-6">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="w-6 h-6 block opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        {children}
      </div>
      {isMenuOpen && (
        <div className="flex-grow w-full flex flex-col items-start sm:items-center sm:flex-row sm:flex-grow sm:pl-16 gap-4 pt-2 sm:pt-0">
          <Link href="/docs">
            <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
              Documentation
            </Button>
          </Link>
          <Link href="/demo">
            <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
              Try the Demo
            </Button>
          </Link>
        </div>
      )}
      <div className="hidden sm:flex grow items-center justify-between sm:pl-16">
        <div className="flex justify-start gap-4">
          <Link href="/docs">
            <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
              Documentation
            </Button>
          </Link>
          <Link href="/demo">
            <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
              Try the Demo
            </Button>
          </Link>
        </div>
        <div className="flex">{children}</div>
      </div>
    </header>
  )
}

export default Header
