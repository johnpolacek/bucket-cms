import React from "react"
import { CollectionFieldsData } from "../../types"
import CollectionData from "./CollectionData"
import DocsSectionFetchingData from "./DocsSectionFetchingData"

function DocsSectionYourCollections({ collections }: { collections: CollectionFieldsData[] }) {
  return (
    <>
      <DocsSectionFetchingData />
      {collections.map((collection) => (
        <CollectionData key={collection.name} collection={collection} />
      ))}
    </>
  )
}

export default DocsSectionYourCollections
