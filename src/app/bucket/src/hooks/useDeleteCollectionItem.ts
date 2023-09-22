import { useState } from "react"
import { CollectionData } from "../types"

function useDeleteCollectionItem(collectionData: CollectionData) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const deleteItem = async (itemId: string) => {
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/bucket/item/delete?itemId=${itemId}&collectionName=${collectionData.collectionName}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete item")
      }
    } catch (error: any) {
      setDeleteError(error.message)
    } finally {
      setIsDeleting(false)
    }
  }

  return { isDeleting, deleteError, deleteItem }
}

export { useDeleteCollectionItem }
