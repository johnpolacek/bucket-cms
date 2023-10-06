"use client"
import { Button } from "../../ui"
import { CollectionData } from "../../types"
import { useDeleteCollection } from "../../hooks"
import { useRouter } from "next/router"

function CollectionManageEmpty({ collectionName, onDelete, onCreateItem }: { collectionName: string; onDelete: () => void; onCreateItem: (collection: CollectionData) => void }) {
  const { isDeleting, deleteError, deleteCollection, selectedCollectionForDeletion, setSelectedCollectionForDeletion } = useDeleteCollection()

  const handleDeleteCollection = async () => {
    await deleteCollection(collectionName)
    if (!deleteError) {
      onDelete()
    } else {
      console.error(deleteError)
      alert("An error occurred while trying to delete the collection. Please try again.")
    }
  }

  const router = useRouter()

  return (
    <div className="py-16 w-full text-center text-lg italic border-b">
      <div className="pb-6 opacity-60">This collection is empty...</div>
      <Button
        onClick={() => router.push("./admin/collection/" + collectionName.replace(/\s+/g, "_") + "/new")}
        variant="outline"
        className="bg-green-500 text-white text-xl h-auto py-4 px-6 hover:bg-green-400 hover:scale-110 hover:text-white transition-all ease-in-out"
      >
        + Create First Item
      </Button>
      <div className="pt-8">
        {selectedCollectionForDeletion === collectionName ? (
          <div className="inline-flex flex-col sm:flex-row items-center">
            <span className="mr-2 font-bold italic">Confirm delete collection?</span>
            <div className="flex">
              <Button variant="ghost" className="text-red-600 ml-2" onClick={handleDeleteCollection} disabled={isDeleting}>
                Yes
              </Button>
              <Button variant="outline" className="ml-2" onClick={() => setSelectedCollectionForDeletion(null)} disabled={isDeleting}>
                No
              </Button>
            </div>
          </div>
        ) : (
          <Button variant="ghost" className="text-red-500" onClick={() => setSelectedCollectionForDeletion(collectionName)}>
            Delete {collectionName}
          </Button>
        )}
      </div>
    </div>
  )
}

export default CollectionManageEmpty
