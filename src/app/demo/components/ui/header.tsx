import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./button"

const Header = ({ children }: { children: React.ReactElement }) => {
  return (
    <header className="px-4 py-2 items-center flex justify-between">
      <Link href="/" className="flex gap-1 items-center">
        <div className="h-[72px] -mt-1 flex items-center overflow-hidden">
          <Image src="/bucket-cms-logo.png" width={54} height={54} alt="" />
        </div>
        <h2 className="font-extrabold text-2xl text-blue-600">
          Bucket <span className="font-bold text-lg relative -left-[2px] -top-px text-blue-400">CMS</span>
        </h2>
      </Link>
      <div className="flex grow pl-16 gap-4">
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
      <div>{children}</div>
    </header>
  )
}

export default Header
