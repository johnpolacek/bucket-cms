import ItemForm from "@/app/bucket/src/views/admin/ItemForm"
import { PageHeading } from "@/app/bucket/src/views/brand"

export default async function NewItemPage({ params }: { params: { collectionSlug: string } }) {
  const collectionName = params.collectionSlug.replace(/_/g, " ")

  return (
    <div className="pb-32 flex flex-col items-center gap-8">
      <PageHeading>New {collectionName} Item</PageHeading>
      <ItemForm collectionName={collectionName} onCancel="../../../../admin" onComplete="../../../../admin" />
    </div>
  )
}
