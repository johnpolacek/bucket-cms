import CollectionForm from "../../../../src/views/admin/CollectionForm"
import { Collection } from "../../../../src/types"
import { readCollectionSchema } from "@/app/api/bucket/s3/operations"

export default async function EditCollectionPage({ params }: { params: { collectionSlug: string } }) {
  const collectionName = params.collectionSlug.replace(/_/g, " ")
  const collection: Collection | null = await readCollectionSchema(collectionName)

  return (
    <div className="pb-32">
      <CollectionForm collection={collection} />
    </div>
  )
}
