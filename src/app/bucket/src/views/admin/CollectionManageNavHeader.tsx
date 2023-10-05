"use client"
import { Button } from "../../ui"
import { CollectionData } from "../../types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui"

function CollectionManageNavHeader({ otherCollections, onSelectCollection }: { otherCollections?: CollectionData[]; onSelectCollection: (collection: CollectionData) => void }) {
  if (!otherCollections) {
    return null
  }

  return (
    <div className="flex justify-center pt-12 gap-2">
      <Button className="-mt-8 sm:-mt-16 bg-[rgba(255,255,255,.75)] hover:bg-white scale-110 sm:scale-100" variant="outline" onClick={onFinish}>
        <span className="text-2xl -mt-[2px] pr-2 opacity-50 font-thin scale-x-125">‹</span> Back to Admin
      </Button>
      {otherCollections && otherCollections.length && (
        <div className="-mt-8 sm:-mt-16 inline-block">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline" className="text-gray-600 pr-6">
                Go to... <span className="text-2xl pt-4 opacity-70 font-thin scale-x-125 -rotate-90">‹</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {otherCollections?.map((c: CollectionData, index) => (
                <DropdownMenuItem key={c.collectionName} onSelect={() => onSelectCollection(otherCollections[index])}>
                  {c.collectionName}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  )
}

export default CollectionManageNavHeader
