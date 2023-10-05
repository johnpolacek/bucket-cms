"use client"
import { Button } from "../../ui"
import { CollectionData } from "../../types"
import { useDeleteCollection } from "../../hooks"

function CollectionManageEmpty({ collectionData, onDelete, onCreateItem }: { collectionData: CollectionData; onDelete: () => void; onCreateItem: (collection: CollectionData) => void }) {
  const { isDeleting, deleteError, deleteCollection, confirmDeleteCollection, setConfirmDeleteCollection } = useDeleteCollection(collectionData)

  const handleDeleteCollection = async () => {
    await deleteCollection()
    if (!deleteError) {
      onDelete()
    } else {
      console.error(deleteError)
      alert("An error occurred while trying to delete the collection. Please try again.")
    }
  }

  return (
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
              <Button variant="ghost" className="text-red-600 ml-2" onClick={handleDeleteCollection} disabled={isDeleting}>
                Yes
              </Button>
              <Button variant="outline" className="ml-2" onClick={() => setConfirmDeleteCollection(false)} disabled={isDeleting}>
                No
              </Button>
            </div>
          </div>
        ) : (
          <Button variant="ghost" className="text-red-500" onClick={() => setConfirmDeleteCollection(true)}>
            Delete {collectionData.collectionName}
          </Button>
        )}
      </div>
    </div>
  )
}

export default CollectionManageEmpty
