import "./globals.css"
import "prismjs/themes/prism.css"
import Header from "./demo/components/ui/header"
import Footer from "./demo/components/ui/footer"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bucket CMS",
  description: "Bucket is the world’s first AI-Powered Portable Drop-in Headless CMS (no database necessary).",
  icons: {
    icon: "/favicon-32x32.png",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="smooth-scroll">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div className="flex flex-col min-h-screen">
          <Header />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
