import React, { useState } from "react"
import { Button } from "../components/ui"
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
  const [deletedCollections, setDeletedCollections] = useState<string[]>([])
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const handleDeleteCollection = async (collectionName: string) => {
    try {
      const response = await fetch(`/api/bucket/collection/delete?collectionName=${collectionName}`, {
        method: "DELETE",
      })

      const data = await response.json()
      if (response.ok) {
        setDeletedCollections((prev) => [...prev, collectionName])
        setDeleteError(null) // Reset any previous error
      } else {
        setDeleteError(data.error || "Failed to delete collection.")
      }
    } catch (error: any) {
      setDeleteError(`Error deleting collection: ${error.message || "unknown"}`)
    }
  }

  return (
    <>
      <h3 className="text-center font-semibold text-3xl">Your Collections</h3>
      <div className="my-8 bg-white p-8 rounded-xl shadow">
        <div className="border-t">
          {deleteError && <div className="text-red-500">{deleteError}</div>}
          {collections
            .filter((col) => !deletedCollections.includes(col.collectionName))
            .map((collection: CollectionData) => (
              <div key={collection.collectionName} className="flex justify-between items-center border-b py-4 px-8">
                <div className="sm:min-w-[240px]">
                  {collection.collectionName}
                  {collection.itemCount > 0 && <span className="ml-1 font-mono text-sm opacity-60">({collection.itemCount})</span>}
                </div>
                <div className="flex gap-3 pr-4">
                  <Button onClick={() => onCreateItem(collection.collectionName)} className="text-green-600" variant="outline">
                    + New
                  </Button>
                  <Button onClick={() => onManage(collection.collectionName)} className="text-blue-600" variant="outline">
                    Manage
                  </Button>
                  {collection.itemCount === 0 && (
                    <Button
                      aria-label={`Delete ${collection.collectionName}`}
                      variant="ghost"
                      className="text-2xl px-2 -mr-[43px] text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteCollection(collection.collectionName)}
                    >
                      ×
                    </Button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="flex justify-center">
        <Button className="text-lg py-3 h-auto bg-green-600 hover:bg-green-600 hover:scale-105 transition-all" onClick={onCreateCollection} size="lg">
          + Create New Collection
        </Button>
      </div>
    </>
  )
}

export default CollectionsList
