import React from "react"
import { Button } from "../../ui/Button"
import { CollectionData } from "../types"

function CollectionsList({
  collections,
  onCreateCollection,
  onCreateItem,
  onManage,
}: {
  collections: CollectionData[]
  onCreateCollection: () => void
  onCreateItem: (collectionName: string) => void
  onManage: (collectionName: string) => void
}) {
  return (
    <>
      <h3 className="text-center font-semibold text-3xl">Your Collections</h3>
      <div className="my-8 bg-white p-8 rounded-xl shadow">
        <div className="border-t">
          {collections.map((collection: CollectionData) => (
            <div key={collection.collectionName} className="flex justify-between items-center border-b py-4 px-8">
              <div className="sm:min-w-[240px]">
                {collection.collectionName}
                {collection.itemCount > 0 && <span className="ml-1 font-mono text-sm opacity-60">({collection.itemCount})</span>}
              </div>
              <div className="flex gap-3">
                <Button onClick={() => onCreateItem(collection.collectionName)} className="text-green-600" variant="outline">
                  + New
                </Button>
                <Button onClick={() => onManage(collection.collectionName)} className="text-blue-600" variant="outline">
                  Manage
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <Button className="text-lg py-3 h-auto bg-green-600" onClick={onCreateCollection} size="lg">
          + Create New Collection
        </Button>
      </div>
    </>
  )
}

export default CollectionsList
