import CollectionForm from "../../../../src/views/admin/CollectionForm"
import { Collection } from "../../../../src/types"

export default async function EditCollectionPage({ params }: { params: { collectionSlug: string } }) {
  const collectionName = params.collectionSlug.replace(/_/g, " ")
  const response = await fetch(`/api/bucket/collection/read?collectionName=${collectionName}`)
  const collection: Collection = await response.json()

  return (
    <div className="pb-32">
      <CollectionForm collection={collection} />
    </div>
  )
}
