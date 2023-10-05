import { useState } from "react"

function useDeleteCollection() {
  const [selectedCollectionForDeletion, setSelectedCollectionForDeletion] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const deleteCollection = async (collectionName: string) => {
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/bucket/collection/delete?collectionName=${collectionName}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete collection")
      }
    } catch (error: any) {
      setDeleteError(error.message)
    } finally {
      setIsDeleting(false)
      setSelectedCollectionForDeletion(null)
    }
  }

  return {
    isDeleting,
    deleteError,
    deleteCollection,
    selectedCollectionForDeletion,
    setSelectedCollectionForDeletion,
  }
}

export { useDeleteCollection }
