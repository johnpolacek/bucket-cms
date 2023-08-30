import React from "react"
import { CollectionFetch } from "../../types"
import CollectionData from "./CollectionData"
import DocsSection from "./DocsSection"
import DocsSectionFetchingData from "./DocsSectionFetchingData"

function DocsSectionYourCollections({ collections }: { collections: CollectionFetch[] }) {
  return (
    <>
      <DocsSectionFetchingData />
      {collections.map((collection) => (
        <CollectionData collection={collection} />
      ))}
    </>
  )
}

export default DocsSectionYourCollections
