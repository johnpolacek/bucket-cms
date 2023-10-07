"use client"
import React, { useState } from "react"
import { Button } from "../../ui"
import { CollectionData } from "../../types"
import { cn } from "../../ui/utils"
import Link from "next/link"
import { useDeleteCollection } from "../../hooks"
import { useRouter } from "next/navigation"

function CollectionsListRow({ collection, onDelete }: { collection: CollectionData; onDelete: (collection: CollectionData) => void }) {
  const [confirmDeleteCollection, setConfirmDeleteCollection] = useState(false)
  const { isDeleting, deleteError, deleteCollection, selectedCollectionForDeletion } = useDeleteCollection()
  const router = useRouter()

  const handleDeleteCollection = async () => {
    await deleteCollection(collection.collectionName)
    if (!deleteError) {
      onDelete(collection)
    } else {
      console.error(deleteError)
      alert("An error occurred while trying to delete the collection. Please try again.")
    }
  }

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-2 items-center border-b py-4 px-8">
      <div className="sm:min-w-[240px]">
        {collection.collectionName}
        {collection.itemCount > 0 && <span className="ml-1 font-mono text-sm opacity-60">({collection.itemCount})</span>}
      </div>
      <div className="flex gap-3 pr-4 sm:w-[320px] justify-end items-center -mr-4 sm:mr-0">
        {selectedCollectionForDeletion === collection.collectionName && isDeleting ? (
          <span className="ml-2 text-gray-500 italic">Deleting...</span>
        ) : (
          <>
            {confirmDeleteCollection ? (
              <>
                <span className="mr-2 font-bold italic">Delete?</span>
                <Button variant="ghost" className="text-red-600" onClick={() => handleDeleteCollection()} disabled={isDeleting}>
                  Yes
                </Button>
                <Button variant="outline" className="mr-12" onClick={() => setConfirmDeleteCollection(false)} disabled={isDeleting}>
                  No
                </Button>
              </>
            ) : (
              <>
                <Link href={`./admin/collection/${collection.collectionName.replace(/\s+/g, "_")}/item/new`}>
                  <Button
                    className={cn("w-[90px]", collection.itemCount > 0 ? "text-green-600 hover:text-green-600" : "bg-green-500 hover:bg-green-600 text-white")}
                    variant={collection.itemCount > 0 ? "outline" : "default"}
                  >
                    + New
                  </Button>
                </Link>
                {collection.itemCount === 0 ? (
                  <Link href={`./admin/collection/${collection.collectionName.replace(/\s+/g, "_")}/edit`}>
                    <Button className="w-[90px] text-blue-600 hover:text-blue-600" variant="outline">
                      Edit
                    </Button>
                  </Link>
                ) : (
                  <Link href={`./admin/collection/${collection.collectionName.replace(/\s+/g, "_")}/manage`}>
                    <Button className="w-[90px] text-blue-600 hover:text-blue-600" variant="outline">
                      Manage
                    </Button>
                  </Link>
                )}
                <Button
                  aria-label={collection.itemCount === 0 ? `Delete ${collection.collectionName}` : ""}
                  variant="ghost"
                  className={cn("text-2xl px-2", collection.itemCount === 0 ? "text-red-500 hover:text-red-700" : "opacity-0 pointer-events-none")}
                  onClick={() => setConfirmDeleteCollection(true)}
                >
                  ×
                </Button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default CollectionsListRow
