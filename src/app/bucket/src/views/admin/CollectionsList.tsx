import React, { useState, useEffect } from "react"
import { Button } from "../../ui"
import { CollectionData } from "../../types"
import { Transition } from "@headlessui/react"

function CollectionsList({
  onCreateCollection,
  onCreateItem,
  onManage,
  collections,
}: {
  onCreateCollection: () => void
  onCreateItem: (collection: CollectionData) => void
  onManage: (collection: CollectionData) => void
  collections: CollectionData[]
}) {
  const [deletedCollections, setDeletedCollections] = useState<string[]>([])
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [confirmDeleteCollectionName, setConfirmDeleteCollectionName] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteCollection = async (collectionName: string) => {
    setIsDeleting(true)
    if (confirmDeleteCollectionName === collectionName) {
      try {
        const response = await fetch(`/api/bucket/collection/delete?collectionName=${collectionName}`, {
          method: "DELETE",
        })

        if (response.ok) {
          setDeletedCollections((prev) => [...prev, collectionName])
          setDeleteError(null)
        } else {
          const data = await response.json()
          setDeleteError(data.error || "Failed to delete collection.")
        }
      } catch (error: any) {
        setDeleteError(`Error deleting collection: ${error.message || "unknown"}`)
      } finally {
        setIsDeleting(false)
        setConfirmDeleteCollectionName(null)
      }
    } else {
      setConfirmDeleteCollectionName(collectionName)
      setIsDeleting(false)
    }
  }

  const collectionsList = collections ? collections.filter((col) => !deletedCollections.includes(col.collectionName)) : []

  return (
    <div className="flex flex-col">
      <Transition appear={true} show={true} enter="transition-all duration-300" enterFrom="opacity-0" enterTo="opacity-100">
        <h3 className="text-center font-semibold text-3xl mt-4 sm:mt-0">Your Collections</h3>
      </Transition>
      <>
        {collectionsList.length > 0 ? (
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
            <div className="flex flex-col sm:flex-row justify-center">
              <div className="my-8 border bg-white p-8 sm:rounded-xl shadow">
                <div className="border-t">
                  {deleteError && <div className="text-red-500">{deleteError}</div>}
                  {collectionsList.map((collection: CollectionData) => (
                    <div key={collection.collectionName} className="flex flex-col sm:flex-row sm:justify-between gap-2 items-center border-b py-4 px-8">
                      <div className="sm:min-w-[240px]">
                        {collection.collectionName}
                        {collection.itemCount > 0 && <span className="ml-1 font-mono text-sm opacity-60">({collection.itemCount})</span>}
                      </div>
                      <div className="flex gap-3 pr-4 sm:w-[320px] justify-end -mr-4 sm:mr-0">
                        {confirmDeleteCollectionName !== collection.collectionName && (
                          <>
                            <Button onClick={() => onCreateItem(collection)} className="text-green-600" variant="outline">
                              + New
                            </Button>
                            <Button onClick={() => onManage(collection)} className="text-blue-600" variant="outline">
                              Manage
                            </Button>
                          </>
                        )}
                        {collection.itemCount === 0 && (
                          <div className="flex justify-end gap-2 -mr-[43px]">
                            {confirmDeleteCollectionName === collection.collectionName ? (
                              <div className="inline-flex gap-3 items-center mr-[43px]">
                                {isDeleting ? (
                                  <span className="ml-2 text-gray-500 italic">Deleting...</span>
                                ) : (
                                  <>
                                    <span className="mr-2 font-bold italic">Confirm delete?</span>
                                    <Button variant="ghost" className="text-red-600" onClick={() => handleDeleteCollection(collection.collectionName)} disabled={isDeleting}>
                                      Yes
                                    </Button>
                                    <Button variant="outline" onClick={() => setConfirmDeleteCollectionName(null)} disabled={isDeleting}>
                                      No
                                    </Button>
                                  </>
                                )}
                              </div>
                            ) : (
                              <Button
                                aria-label={`Delete ${collection.collectionName}`}
                                variant="ghost"
                                className="text-2xl px-2 text-red-500 hover:text-red-700"
                                onClick={() => handleDeleteCollection(collection.collectionName)}
                              >
                                ×
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Button className="text-lg py-3 h-auto text-white bg-blue-600 hover:bg-blue-600 hover:scale-105 transition-all" onClick={onCreateCollection} size="lg">
                + Create New Collection
              </Button>
            </div>
          </Transition>
        ) : (
          <div className="flex flex-col items-center gap-8 pt-16">
            <div className="opacity-70">Looks like you don’t have any Collections</div>
            <div className="flex justify-center">
              <Button className="text-lg py-3 h-auto text-white bg-blue-600 hover:bg-blue-600 hover:scale-105 transition-all" onClick={onCreateCollection} size="lg">
                + Create New Collection
              </Button>
            </div>
          </div>
        )}
      </>
    </div>
  )
}

export default CollectionsList
