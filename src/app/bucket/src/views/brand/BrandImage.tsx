import Image from "next/image"

const BrandImage = () => {
  return <Image className="opacity-90 rounded-full overflow-hidden border border-blue-300 mx-auto mb-2" src="/bucket-cms-logo.png" width={210} height={210} alt="" />
}

export { BrandImage }
