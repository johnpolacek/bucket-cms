"use client"
import { Button } from "../../ui"
import { CollectionData } from "../../types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui"
import { useRouter } from "next/navigation"
import Link from "next/link"

function CollectionManageNavHeader({ otherCollections }: { otherCollections?: CollectionData[] }) {
  if (!otherCollections) {
    return null
  }

  const router = useRouter()

  return (
    <div className="flex justify-center pt-12 pb-8 gap-2">
      {otherCollections && otherCollections.length && (
        <>
          <Link href="../../">
            <Button className="]bg-[rgba(255,255,255,.75)] hover:bg-white scale-110 sm:scale-100" variant="outline">
              <span className="text-2xl -mt-[2px] pr-2 opacity-50 font-thin scale-x-125">‹</span> Back to Admin
            </Button>
          </Link>
          <div className="inline-block">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-center overflow-hidden h-[36px] border shadow-sm rounded text-gray-600 pl-4 pr-6">
                <>
                  Go to... <span className="text-2xl pt-4 opacity-70 font-thin scale-x-125 -rotate-90">‹</span>
                </>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {otherCollections?.map((c: CollectionData, index) => (
                  <DropdownMenuItem key={c.collectionName} onSelect={() => router.push(`../${otherCollections[index].collectionName.replace(/\s+/g, "_")}/manage`)}>
                    {c.collectionName}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      )}
    </div>
  )
}

export default CollectionManageNavHeader
