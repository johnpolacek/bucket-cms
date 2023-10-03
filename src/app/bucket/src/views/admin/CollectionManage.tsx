"use client"
import React, { useState } from "react"
import ItemForm from "./ItemForm"
import { Button } from "../../ui"
import { CollectionData, CollectionItemData } from "../../types"
import { Transition } from "@headlessui/react"
import { useCollectionFieldData, useDeleteCollectionItem, useFetchCollectionItems } from "../../hooks"
import CollectionDataDocumentation from "../dev/CollectionDataDocumentation"
import { cn } from "../../ui/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui"

function CollectionManage({
  collections,
  collectionData,
  onManage,
  onFinish,
  onCreateItem,
}: {
  collections: CollectionData[] | null
  collectionData: CollectionData
  onManage: (collection: CollectionData) => void
  onFinish: () => void
  onCreateItem: (collection: CollectionData) => void
}) {
  const { collection: collectionFieldData, error: collectionError } = useCollectionFieldData(collectionData)
  const [editItem, setEditItem] = useState<CollectionItemData | null>(null)
  const [confirmDeleteItemId, setConfirmDeleteItemId] = useState<string | null>(null)
  const [confirmDeleteCollection, setConfirmDeleteCollection] = useState(false)
  const [showDocs, setShowDocs] = useState(window.innerWidth > 768)

  const { items, loading, error, refresh } = useFetchCollectionItems(collectionData)
  const { isDeleting, deleteError, deleteItem } = useDeleteCollectionItem(collectionData)

  const handleCancelEdit = () => {
    setEditItem(null)
  }

  const handleCompleteEdit = () => {
    setEditItem(null)
    refresh()
  }

  const handleDeleteItem = async (itemId: string) => {
    if (confirmDeleteItemId === itemId) {
      await deleteItem(itemId)
      if (!deleteError) {
        refresh()
      }
      setConfirmDeleteItemId(null)
    } else {
      setConfirmDeleteItemId(itemId)
    }
  }

  const handleDeleteCollection = async () => {
    if (confirmDeleteCollection) {
      try {
        const response = await fetch(`/api/bucket/collection/delete?collectionName=${collectionData.collectionName}`, {
          method: "DELETE",
        })
        if (!response.ok) {
          throw new Error("Failed to delete collection")
        } else {
          onFinish()
        }
      } catch (error: any) {
        console.error(error)
        alert("An error occurred while trying to delete the collection. Please try again.")
      } finally {
        setConfirmDeleteCollection(false)
      }
    } else {
      setConfirmDeleteCollection(true)
    }
  }

  const otherCollections = collections?.filter((c) => c.collectionName !== collectionData.collectionName)

  return (
    <>
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
                  <DropdownMenuItem key={c.collectionName} onSelect={() => onManage(otherCollections[index])}>
                    {c.collectionName}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      {!editItem && !loading && (
        <div className="flex items-center justify-center w-full mt-8 sm:mt-0">
          <Transition appear={true} show={true} enter="transition-all duration-300" enterFrom="opacity-0 translate-y-4" enterTo="opacity-100 translate-y-0" className="sm:px-8 w-full">
            <h3 className="w-full text-center uppercase tracking-wide opacity-50 text-sm">Manage</h3>
            <h4 className="w-full text-center font-semibold text-4xl pb-6">{collectionData.collectionName}</h4>
            <div className={cn("flex w-full max-w-[1280px] relative mx-auto sm:my-4 p-4 sm:p-12 sm:divide-x sm:border rounded-xl sm:shadow transition-all ease-in-out", showDocs ? "gap-12" : "gap-8")}>
              <Button
                onClick={() => setShowDocs(!showDocs)}
                variant="outline"
                className={cn("md:hidden -top-[104px] sm:top-2 scale-75 sm:scale-90 text-gray-600 absolute right-0 sm:right-2", showDocs ?? "justify-start right-6")}
              >
                {showDocs ? (
                  <>
                    <span>hide docs </span>
                    <span className="font-light text-xl relative -right-1 -top-px">»</span>
                  </>
                ) : (
                  <>
                    <span className="font-light text-xl relative -left-1 -top-px">«</span>
                    <span className="whitespace-nowrap"> show docs</span>
                  </>
                )}
              </Button>
              <div className={cn("border-t transition-all ease-in-out grow", showDocs ? "w-full sm:w-1/2" : "w-full")}>
                {items.length === 0 && (
                  <div className="py-16 w-full text-center text-lg italic border-b">
                    <div className="pb-6 opacity-60">This collection is empty...</div>
                    <Button
                      onClick={() => onCreateItem(collectionData)}
                      variant="outline"
                      className="bg-green-500 text-white text-xl h-auto py-4 px-6 hover:bg-green-400 hover:scale-110 hover:text-white transition-all ease-in-out"
                    >
                      + Create First Item
                    </Button>
                    <div className="pt-8">
                      {confirmDeleteCollection ? (
                        <div className="inline-flex flex-col sm:flex-row items-center">
                          <span className="mr-2 font-bold italic">Confirm delete collection?</span>
                          <div className="flex">
                            <Button variant="ghost" className="text-red-600 ml-2" onClick={handleDeleteCollection}>
                              Yes
                            </Button>
                            <Button variant="outline" className="ml-2" onClick={() => setConfirmDeleteCollection(false)}>
                              No
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button variant="ghost" className="text-red-500" onClick={handleDeleteCollection}>
                          Delete {collectionData.collectionName}
                        </Button>
                      )}
                    </div>
                  </div>
                )}
                {items.map((item) => (
                  <div key={item.itemId} className="flex justify-between items-center border-b py-4 px-2 pr-8 sm:px-8 gap-2">
                    <div className="sm:pr-12 py-4 sm:py-0 text-center sm:text-left">{item.itemName}</div>
                    <div>
                      {!confirmDeleteItemId && (
                        <Button variant="outline" className="text-blue-600" onClick={() => setEditItem(item)}>
                          edit
                        </Button>
                      )}
                      {confirmDeleteItemId === item.itemId ? (
                        <div className="inline-flex flex-col sm:flex-row items-center -mr-8">
                          {isDeleting ? (
                            <div className="ml-2 text-gray-500 italic pr-4">Deleting...</div>
                          ) : (
                            <>
                              <div className="mr-2 font-bold italic">Confirm delete?</div>
                              <div className="flex pt-2 sm:pt-0">
                                <Button variant="ghost" className="text-red-600 ml-2" onClick={() => handleDeleteItem(item.itemId)}>
                                  Yes
                                </Button>
                                <Button variant="outline" className="ml-2" onClick={() => setConfirmDeleteItemId(null)}>
                                  No
                                </Button>
                              </div>
                            </>
                          )}
                        </div>
                      ) : (
                        <Button aria-label={`Delete ${item.itemName}`} variant="ghost" className="text-xl ml-2 p-2 -mr-8 text-red-500 hover:text-red-700" onClick={() => handleDeleteItem(item.itemId)}>
                          ×
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                {items.length > 0 && (
                  <div className="w-full text-right my-4">
                    <Button onClick={() => onCreateItem(collectionData)} variant="outline" className="text-green-600">
                      + New
                    </Button>
                  </div>
                )}

                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && <ul></ul>}
              </div>
              <div
                className={cn(
                  "min-h-screen sm:min-h-0 bg-white sm:block px-4 sm:pl-12 overflow-auto relative transition-all ease-in-out",
                  showDocs ? "absolute z-10 top-0 left-0 sm:static w-full sm:block sm:w-1/2 grow" : "hidden w-auto shrink"
                )}
              >
                {collectionFieldData && showDocs && <CollectionDataDocumentation collection={collectionFieldData} />}
              </div>
            </div>
          </Transition>
        </div>
      )}

      {editItem && (
        <div className="py-4">
          <ItemForm collectionData={collectionData} itemToEdit={editItem} onCancel={handleCancelEdit} onComplete={handleCompleteEdit} />
        </div>
      )}
    </>
  )
}

export default CollectionManage
