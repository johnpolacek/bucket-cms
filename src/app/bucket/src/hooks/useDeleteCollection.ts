import { useState } from "react"
import { CollectionData } from "../types"

function useDeleteCollection(collectionData: CollectionData) {
  const [confirmDeleteCollection, setConfirmDeleteCollection] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const deleteCollection = async () => {
    if (confirmDeleteCollection) {
      setIsDeleting(true)
      try {
        const response = await fetch(`/api/bucket/collection/delete?collectionName=${collectionData.collectionName}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error("Failed to delete collection")
        }
      } catch (error: any) {
        setDeleteError(error.message)
      } finally {
        setIsDeleting(false)
        setConfirmDeleteCollection(false)
      }
    } else {
      setConfirmDeleteCollection(true)
    }
  }

  return { isDeleting, deleteError, deleteCollection, confirmDeleteCollection, setConfirmDeleteCollection }
}

export { useDeleteCollection }
