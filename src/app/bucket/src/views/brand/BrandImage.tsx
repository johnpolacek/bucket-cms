import Image from "next/image"
import { cn } from "../../ui/utils"

const BrandImage = ({ className }: { className?: string }) => {
  return (
    <div className={cn("rounded-full overflow-hidden border border-blue-200 mx-auto mb-2 w-[210px] relative", className)}>
      <div className="w-full h-1/4 absolute bottom-0 left-0 bg-gradient-to-t from-[rgba(255,255,255,1)] to-[rgba(255,255,255,0)] z-10"></div>
      <Image className="opacity-80 scale-[.85] relative" src="/bucket-cms-logo.jpg" width={210} height={210} alt="" />
    </div>
  )
}

export { BrandImage }
