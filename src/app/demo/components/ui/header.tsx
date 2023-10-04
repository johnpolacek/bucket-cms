import { getServerSession } from "next-auth/next"
import { options } from "../../options"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./button"
import GithubLink from "./github-link"
import UserDropdownMenu from "./user-dropdown-menu"
import HeaderMobileMenu from "./header-mobile-menu"

const Header = async () => {
  const session = await getServerSession(options)

  return (
    <header className="px-4 flex flex-wrap justify-between items-center border-b">
      <Link href="/">
        <div className="flex items-center cursor-pointer pl-4">
          <div className="h-[54px] w-[54px] my-2 flex items-center overflow-hidden relative -top-[2px]">
            <Image src="/bucket-cms-logo.png" width={54} height={54} alt="Bucket CMS Logo" />
          </div>
          <h2 className="font-extrabold text-2xl text-blue-600 sm:text-2xl scale-90 hover:scale-100 transition-all ease-in-out">
            Bucket <span className="font-bold text-lg relative -left-[2px] -top-px text-blue-400">CMS</span>
          </h2>
        </div>
      </Link>
      <HeaderMobileMenu />
      <div className="hidden sm:flex grow items-center justify-between sm:pl-16">
        <div className="flex justify-start gap-4">
          <Link href="/bucket/docs">
            <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
              Documentation
            </Button>
          </Link>
          <Link href="/bucket/admin">
            <Button>Try the Demo</Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
              Contact
            </Button>
          </Link>
        </div>
      </div>
      {session?.user?.name ? <UserDropdownMenu user={session?.user?.name} /> : <GithubLink />}
    </header>
  )
}

export default Header
