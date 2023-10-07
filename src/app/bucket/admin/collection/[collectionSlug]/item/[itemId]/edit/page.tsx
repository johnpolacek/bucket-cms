import ItemForm from "@/app/bucket/src/views/admin/ItemForm"
import { CollectionItemData } from "@/app/bucket/src/types"
import { readCollectionItem } from "@/app/api/bucket/s3/operations"
import { PageHeading } from "@/app/bucket/src/views/brand"

export default async function EditCollectionPage({ params }: { params: { collectionSlug: string; itemId: string } }) {
  const collectionName = params.collectionSlug.replace(/_/g, " ")
  const itemId = params.itemId
  const itemData: CollectionItemData = await readCollectionItem(collectionName, itemId)

  return (
    <div className="pb-32 flex flex-col items-center gap-8">
      <PageHeading>Edit {collectionName} Item</PageHeading>
      <ItemForm collectionName={collectionName} onCancel="../../../../admin" onComplete="../../../../admin" itemToEdit={itemData} />
    </div>
  )
}
