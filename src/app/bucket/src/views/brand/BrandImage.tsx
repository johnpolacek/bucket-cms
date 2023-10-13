import Image from "next/image"
import { cn } from "../../ui/utils"

const BrandImage = ({ className }: { className?: string }) => {
  return <Image className={cn("opacity-90 rounded-full overflow-hidden border border-blue-300 mx-auto mb-2", className)} src="/bucket-cms-logo.png" width={210} height={210} alt="" />
}

export { BrandImage }
