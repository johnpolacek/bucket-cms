import React from "react"
import { CollectionFetch } from "../../types"
import DocsSectionIntroduction from "./DocsSectionIntroduction"
import DocsSectionCollections from "./DocsSectionCollections"
import DocsSectionYourCollections from "./DocsSectionYourCollections"
import DocsSectionAdmin from "./DocsSectionAdmin"
import DocsSectionFields from "./DocsSectionFields"

function Docs({ collections }: { collections: CollectionFetch[] }) {
  return (
    <div className="flex flex-col gap-12 py-8">
      <DocsSectionIntroduction />
      <DocsSectionAdmin />
      <DocsSectionCollections />
      <DocsSectionFields />
      <DocsSectionYourCollections collections={collections} />
    </div>
  )
}

export default Docs
