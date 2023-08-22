import React from "react"
import { Button } from "../../ui/Button"

function CollectionsList({
  collectionNames,
  onCreateCollection,
  onCreateItem,
  onManage,
}: {
  collectionNames: string[]
  onCreateCollection: () => void
  onCreateItem: (collectionName: string) => void
  onManage: (collectionName: string) => void
}) {
  return (
    <>
      <h3 className="text-center font-semibold text-xl">Your Collections</h3>
      <div className="my-8 border-t">
        {collectionNames.map((collectionName: string) => (
          <div className="flex justify-between items-center border-b py-4 px-8">
            <div>{collectionName}</div>
            <div className="flex gap-3">
              <Button onClick={() => onCreateItem(collectionName)} className="text-green-600" variant="outline">
                + New
              </Button>
              <Button onClick={() => onManage(collectionName)} className="text-blue-600 -mr-12" variant="outline">
                Manage
              </Button>
            </div>
          </div>
        ))}
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
