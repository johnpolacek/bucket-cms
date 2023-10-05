import ItemForm from "@/app/bucket/src/views/admin/ItemForm"

export default async function NewItemPage({ params }: { params: { collectionSlug: string } }) {
  return <div>Create item in {params.collectionSlug.replace(/_/g, " ")}</div>
  // return <ItemForm collectionData={createItemInCollection} onCancel={() => setCreateItemInCollection(undefined)} onComplete={() => setCreateItemInCollection(undefined)} />
}
