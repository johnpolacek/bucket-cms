import CollectionManage from "@/app/bucket/src/views/admin/CollectionManage"
import { Collection } from "../../../../src/types"
import { readCollectionSchema, readCollectionCounts } from "@/app/api/bucket/s3/operations"

export default async function EditCollectionPage({ params }: { params: { collectionSlug: string } }) {
  const collectionName = params.collectionSlug.replace(/_/g, " ")
  const collection: Collection | null = await readCollectionSchema(collectionName)
  const collections = await readCollectionCounts()

  return <div className="pb-32">{collection && collections && <CollectionManage collections={collections} collection={collection} />}</div>
}
