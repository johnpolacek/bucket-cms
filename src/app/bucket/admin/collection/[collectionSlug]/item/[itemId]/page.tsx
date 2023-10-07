import ItemForm from "@/app/bucket/src/views/admin/ItemForm"

export default async function EditCollectionPage({ params }: { params: { collectionSlug: string } }) {
  const collectionName = params.collectionSlug.replace(/_/g, " ")
  const itemId = params.itemId

  return (
    <div className="pb-32">
      <ItemForm collectionName={collectionName} onCancel="../../../../admin" onComplete="../../../../admin" />
    </div>
  )
}
