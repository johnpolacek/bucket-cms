"use client"
import React, { useState } from "react"
import { Button } from "../../ui"
import { CollectionData } from "../../types"
import { Transition } from "@headlessui/react"
import { cn } from "../../ui/utils"
import Link from "next/link"
import { useDeleteCollection } from "../../hooks"

function CollectionsList({
  onCreateItem,
  onManage,
  collections: initialCollections,
}: {
  onCreateItem: (collection: CollectionData) => void
  onManage: (collection: CollectionData) => void
  collections: CollectionData[]
}) {
  const [confirmDeleteCollection, setConfirmDeleteCollection] = useState("")
  const [collections, setCollections] = useState(initialCollections)
  const { isDeleting, deleteError, deleteCollection, selectedCollectionForDeletion, setSelectedCollectionForDeletion } = useDeleteCollection()

  const handleDeleteCollection = async (collectionName: string) => {
    if (selectedCollectionForDeletion === collectionName) {
      await deleteCollection(collectionName)
      if (!deleteError) {
        setCollections((prevCollections: CollectionData[]) => prevCollections.filter((col) => col.collectionName !== collectionName))
      } else {
        console.error(deleteError)
        alert("An error occurred while trying to delete the collection. Please try again.")
      }
    } else {
      setSelectedCollectionForDeletion(collectionName)
    }
  }

  return (
    <div className="flex flex-col">
      <Transition appear={true} show={true} enter="transition-all duration-300" enterFrom="opacity-0" enterTo="opacity-100">
        <h3 className="text-center font-semibold text-3xl mt-4 sm:mt-0">Your Collections</h3>
      </Transition>
      <>
        {collections.length > 0 ? (
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
              <div className="sm:my-8 sm:border bg-white p-8 sm:rounded-xl sm:shadow">
                <div className="border-t">
                  {deleteError && <div className="text-red-500">{deleteError}</div>}
                  {collections.map((collection: CollectionData) => (
                    <div key={collection.collectionName} className="flex flex-col sm:flex-row sm:justify-between gap-2 items-center border-b py-4 px-8">
                      <div className="sm:min-w-[240px]">
                        {collection.collectionName}
                        {collection.itemCount > 0 && <span className="ml-1 font-mono text-sm opacity-60">({collection.itemCount})</span>}
                      </div>
                      <div className="flex gap-3 pr-4 sm:w-[320px] justify-end items-center -mr-4 sm:mr-0">
                        {selectedCollectionForDeletion === collection.collectionName && isDeleting ? (
                          <span className="ml-2 text-gray-500 italic">Deleting...</span>
                        ) : (
                          <>
                            {confirmDeleteCollection === collection.collectionName ? (
                              <>
                                <span className="mr-2 font-bold italic">Delete?</span>
                                <Button variant="ghost" className="text-red-600" onClick={() => handleDeleteCollection(collection.collectionName)} disabled={isDeleting}>
                                  Yes
                                </Button>
                                <Button variant="outline" className="mr-12" onClick={() => setConfirmDeleteCollection("")} disabled={isDeleting}>
                                  No
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button
                                  onClick={() => onCreateItem(collection)}
                                  className={cn("w-[90px]", collection.itemCount > 0 ? "text-green-600 hover:text-green-600" : "bg-green-500 hover:bg-green-600 text-white")}
                                  variant={collection.itemCount > 0 ? "outline" : "default"}
                                >
                                  + New
                                </Button>
                                {collection.itemCount === 0 ? (
                                  <Link href={`./admin/collection/${collection.collectionName.replace(/\s+/g, "_")}/edit`}>
                                    <Button className="w-[90px] text-blue-600 hover:text-blue-600" variant="outline">
                                      Edit
                                    </Button>
                                  </Link>
                                ) : (
                                  <Button onClick={() => onManage(collection)} className="w-[90px] text-blue-600 hover:text-blue-600" variant="outline">
                                    Manage
                                  </Button>
                                )}
                                <Button
                                  aria-label={collection.itemCount === 0 ? `Delete ${collection.collectionName}` : ""}
                                  variant="ghost"
                                  className={cn("text-2xl px-2", collection.itemCount === 0 ? "text-red-500 hover:text-red-700" : "opacity-0 pointer-events-none")}
                                  onClick={() => setConfirmDeleteCollection(collection.collectionName)}
                                >
                                  ×
                                </Button>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Link href="./admin/collection/new">
                <Button className="text-lg py-3 h-auto text-white bg-blue-600 hover:bg-blue-600 hover:scale-105 transition-all" size="lg">
                  + Create New Collection
                </Button>
              </Link>
            </div>
          </Transition>
        ) : (
          <div className="flex flex-col items-center gap-8 pt-16">
            <div className="opacity-70">Looks like you don’t have any Collections</div>
            <div className="flex justify-center">
              <Link href="./admin/collection/new">
                <Button className="text-lg py-3 h-auto text-white bg-blue-600 hover:bg-blue-600 hover:scale-105 transition-all" size="lg">
                  + Create New Collection
                </Button>
              </Link>
            </div>
          </div>
        )}
      </>
    </div>
  )
}

export default CollectionsList
