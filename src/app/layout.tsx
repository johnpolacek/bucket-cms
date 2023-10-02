import "./globals.css"
import "prismjs/themes/prism.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bucket CMS",
  description: "Bucket is the world’s first AI-Powered Portable Drop-in Headless CMS (no database necessary).",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="smooth-scroll">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
