import * as React from "react"
import Image from "next/image"

const Header = () => {
  return (
    <header className="px-4 py-2 items-center flex gap-2">
      <div className="h-[72px] flex items-center overflow-hidden">
        <Image src="/bucket-cms-logo.png" width={72} height={72} alt="" />
      </div>
      <h2 className="font-extrabold text-2xl text-[#1e7898]">
        Bucket <span className="font-medium text-xl relative -top-px opacity-70">CMS</span>
      </h2>
    </header>
  )
}

export default Header
