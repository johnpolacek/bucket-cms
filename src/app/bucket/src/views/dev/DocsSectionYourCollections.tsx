import React from "react"
import { CollectionFetch } from "../../types"
import CollectionData from "./CollectionData"
import DocsSection from "./DocsSection"

function DocsSectionYourCollections({ collections }: { collections: CollectionFetch[] }) {
  return (
    <DocsSection id="your-collections" title="Your Collections">
      {collections.map((collection) => (
        <CollectionData collection={collection} />
      ))}
    </DocsSection>
  )
}

export default DocsSectionYourCollections
