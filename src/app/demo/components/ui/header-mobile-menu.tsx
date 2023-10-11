"use client"
import React, { useState } from "react"
import Link from "next/link"
import { Button } from "./button"

const HeaderMobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <div className="flex items-center sm:hidden gap-6">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="w-6 h-6 block opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="flex-grow w-full border-b flex flex-col items-center sm:items-center sm:flex-row sm:flex-grow sm:pl-16 gap-4 pb-2 sm:pt-0">
          <Link href="/docs">
            <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
              Documentation
            </Button>
          </Link>
          <Link href="/demo">
            <Button>Try the Demo</Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
              Contact
            </Button>
          </Link>
          <Link href="/pricing">
            <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
              Pricing
            </Button>
          </Link>
        </div>
      )}
    </>
  )
}

export default HeaderMobileMenu
