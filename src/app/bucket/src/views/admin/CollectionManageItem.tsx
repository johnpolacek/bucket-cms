"use client"
import React, { useState } from "react"
import Link from "next/link"
import { Button } from "../../ui"
import { CollectionItemData } from "../../types"
import { useDeleteCollectionItem } from "../../hooks"

function CollectionManageItem({ item, collectionName }: { item: CollectionItemData; collectionName: string }) {
  const { isDeleting, deleteError, deleteItem } = useDeleteCollectionItem(collectionName)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onConfirmDelete = async () => {
    await deleteItem(item.itemId)
    if (deleteError) {
      setError("Could not delete item. Please try again.")
    } else {
      setIsDeleted(true)
    }
  }

  if (isDeleted) {
    return null
  }

  console.log("CollectionManageItem", { item })

  return (
    <div className="flex justify-between items-center border-b py-4 px-2 pr-8 sm:px-8 gap-2">
      <div className="sm:pr-12 py-4 sm:py-0 text-center sm:text-left">{item.itemName}</div>
      {error && <div className="text-red-600 italic">{error}</div>}
      <div>
        {!confirmDelete && (
          <Link href={`./item/${item.itemId}/edit`}>
            <Button variant="outline" className="text-blue-600">
              edit
            </Button>
          </Link>
        )}
        {confirmDelete ? (
          <div className="inline-flex flex-col sm:flex-row items-center -mr-8">
            {isDeleting ? (
              <div className="ml-2 text-gray-500 italic pr-4">Deleting...</div>
            ) : (
              <>
                <div className="mr-2 font-bold italic">Confirm delete?</div>
                <div className="flex pt-2 sm:pt-0">
                  <Button variant="ghost" className="text-red-600 ml-2" onClick={onConfirmDelete}>
                    Yes
                  </Button>
                  <Button variant="outline" className="ml-2" onClick={() => setConfirmDelete(false)}>
                    No
                  </Button>
                </div>
              </>
            )}
          </div>
        ) : (
          <Button aria-label={`Delete ${item.itemName}`} variant="ghost" className="text-xl ml-2 p-2 -mr-8 text-red-500 hover:text-red-700" onClick={() => setConfirmDelete(true)}>
            ×
          </Button>
        )}
      </div>
    </div>
  )
}

export default CollectionManageItem
