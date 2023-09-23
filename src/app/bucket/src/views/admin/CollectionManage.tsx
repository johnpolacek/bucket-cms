"use client"
import React, { useState } from "react"
import ItemForm from "./ItemForm"
import { Button } from "../../ui"
import { CollectionData, CollectionItemData } from "../../types"
import { Transition } from "@headlessui/react"
import { useCollectionFieldData, useDeleteCollectionItem, useFetchCollectionItems } from "../../hooks"
import CollectionDataDocumentation from "../dev/CollectionDataDocumentation"

function CollectionManage({ collectionData, onFinish, onCreateItem }: { collectionData: CollectionData; onFinish: () => void; onCreateItem: (collection: CollectionData) => void }) {
  const { collection: collectionFieldData, error: collectionError } = useCollectionFieldData(collectionData)
  const [editItem, setEditItem] = useState<CollectionItemData | null>(null)
  const [confirmDeleteItemId, setConfirmDeleteItemId] = useState<string | null>(null)
  const [confirmDeleteCollection, setConfirmDeleteCollection] = useState(false)

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

  return (
    <>
      <div className="flex justify-center pt-12">
        <Button className="-mt-8 sm:-mt-16 bg-[rgba(255,255,255,.75)] hover:bg-white scale-110 sm:scale-100" variant="outline" onClick={onFinish}>
          <span className="text-2xl -mt-[2px] pr-2 opacity-50 font-thin scale-x-125">‹</span> Back to Admin
        </Button>
      </div>

      {!editItem && !loading && (
        <div className="flex items-center justify-center w-full">
          <Transition appear={true} show={true} enter="transition-all duration-300" enterFrom="opacity-0 translate-y-4" enterTo="opacity-100 translate-y-0" className="px-8 w-full">
            <h3 className="w-full text-center uppercase tracking-wide opacity-50 text-sm -mt-2">Manage</h3>
            <h4 className="w-full text-center font-semibold text-4xl pb-6">{collectionData.collectionName}</h4>
            <div className="flex w-full max-w-[1200px] mx-auto my-4 p-4 sm:p-12 divide-x gap-12 border rounded-xl shadow">
              <div className="min-w-[420px] border-t">
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
                        <div className="inline-flex items-center">
                          <span className="mr-2 font-bold italic">Confirm delete collection?</span>
                          <Button variant="ghost" className="text-red-600 ml-2" onClick={handleDeleteCollection}>
                            Yes
                          </Button>
                          <Button variant="outline" className="ml-2" onClick={() => setConfirmDeleteCollection(false)}>
                            No
                          </Button>
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
                  <div key={item.itemId} className="flex flex-col sm:flex-row sm:justify-between items-center border-b py-4 px-8 gap-2">
                    <div className="sm:pr-12 py-4 sm:py-0 text-center sm:text-left">{item.itemName}</div>
                    <div>
                      {!confirmDeleteItemId && (
                        <Button variant="outline" className="text-blue-600" onClick={() => setEditItem(item)}>
                          edit
                        </Button>
                      )}
                      {confirmDeleteItemId === item.itemId ? (
                        <div className="inline-flex items-center -mr-8">
                          {isDeleting ? (
                            <div className="ml-2 text-gray-500 italic pr-4">Deleting...</div>
                          ) : (
                            <>
                              <span className="mr-2 font-bold italic">Confirm delete?</span>
                              <Button variant="ghost" className="text-red-600 ml-2" onClick={() => handleDeleteItem(item.itemId)}>
                                Yes
                              </Button>
                              <Button variant="outline" className="ml-2" onClick={() => setConfirmDeleteItemId(null)}>
                                No
                              </Button>
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
              <div className="grow pl-12 overflow-auto">{collectionFieldData && <CollectionDataDocumentation collection={collectionFieldData} />}</div>
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
