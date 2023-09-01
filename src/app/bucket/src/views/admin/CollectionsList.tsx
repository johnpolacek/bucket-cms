import React, { useState, useEffect } from "react"
import { Button } from "../../ui"
import { CollectionData } from "../../types"
import { Transition } from "@headlessui/react"

function CollectionsList({
  onCreateCollection,
  onCreateItem,
  onManage,
}: {
  onCreateCollection: () => void
  onCreateItem: (collectionName: string) => void
  onManage: (collectionName: string) => void
}) {
  useEffect(() => {
    const getCollections = async () => {
      const response = await fetch("/api/bucket/collections/count")
      const responseData = await response.json()
      setCollections(responseData.collections)
    }
    getCollections()
  }, [])

  const [collections, setCollections] = useState<CollectionData[]>([])
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
    <div className="flex flex-col">
      <Transition appear={true} show={true} enter="transition-all delay-300 duration-300" enterFrom="opacity-0" enterTo="opacity-100">
        <h3 className="text-center font-semibold text-3xl">Your Collections</h3>
      </Transition>
      {collections.length > 0 && (
        <Transition
          appear={true}
          show={true}
          enter="transition-all duration-150"
          enterFrom="opacity-0 translate-y-4"
          enterTo="opacity-100 translate-y-0"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="flex flex-col"
        >
          <div className="flex justify-center">
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
          </div>
          <div className="flex justify-center">
            <Button className="text-lg py-3 h-auto bg-green-600 hover:bg-green-600 hover:scale-105 transition-all" onClick={onCreateCollection} size="lg">
              + Create New Collection
            </Button>
          </div>
        </Transition>
      )}
    </div>
  )
}

export default CollectionsList
