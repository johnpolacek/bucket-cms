"use client"
import Link from "next/link"
import GithubLink from "./github-link"

const Footer = () => {
  return (
    <footer className="pt-8 pb-12 sm:px-8 border-t bg-gradient-to-b from-gray-50 via-white opacity-70 to-white">
      <div className="max-w-[1024px] px-4 mx-auto flex justify-between">
        <div className="flex flex-col items-center sm:flex-row gap-2 sm:gap-8">
          <p className="text-gray-600 whitespace-nowrap">© {new Date().getFullYear()} Bucket CMS</p>
          <Link className="text-blue-600" href="/privacy">
            Privacy
          </Link>
          <Link className="text-blue-600" href="/terms">
            Terms
          </Link>
          <Link className="text-blue-600" href="/license">
            License
          </Link>
        </div>
        <div className="relative sm:left-16">
          <GithubLink />
        </div>
      </div>
    </footer>
  )
}

export default Footer
