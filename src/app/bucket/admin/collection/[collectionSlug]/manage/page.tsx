import CollectionManage from "@/app/bucket/src/views/admin/CollectionManage"

export default async function ManageCollectionPage({ params }: { params: { collectionSlug: string } }) {
  const collectionName = params.collectionSlug.replace(/_/g, " ")

  return <div className="pb-32">{collection && <CollectionManage collectionName={collectionName} />}</div>
}
