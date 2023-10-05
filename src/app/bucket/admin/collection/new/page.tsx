import CollectionForm from "../../../src/views/admin/CollectionForm"

export default async function NewCollectionPage({ params }: { params: { collectionSlug: string } }) {
  return (
    <div className="pb-32">
      <CollectionForm />
    </div>
  )
}
