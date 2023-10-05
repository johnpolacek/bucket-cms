"use client"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="pt-8 pb-12 sm:px-8 border-t bg-gradient-to-b from-gray-50 via-white opacity-70 to-white">
      <div className="max-w-[1024px] px-4 mx-auto">
        <div className="flex flex-col items-center sm:flex-row gap-2 sm:gap-8">
          <p className="text-gray-600">© {new Date().getFullYear()} Bucket CMS</p>
          <Link className="text-blue-600" href="/privacy">
            Privacy
          </Link>
          <Link className="text-blue-600" href="/terms">
            Terms
          </Link>
          <Link className="text-blue-600" href="https://github.com/johnpolacek/bucket-cms/blob/main/LICENSE.md">
            License
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
