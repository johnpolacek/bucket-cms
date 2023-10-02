"use client"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="pt-4 pb-8 border-t bg-gradient-to-b from-gray-50 via-white opacity-70 to-white">
      <div className="max-w-[1100px] px-4 mx-auto">
        <div className="flex gap-8">
          <p className="text-gray-600">© {new Date().getFullYear()} Bucket CMS</p>
          <Link className="text-blue-600" href="/privacy">
            Privacy
          </Link>
          <Link className="text-blue-600" href="/terms">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
