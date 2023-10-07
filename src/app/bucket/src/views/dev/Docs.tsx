import React from "react"
import { CollectionFieldsData } from "../../types"
import DocsSectionIntroduction from "./DocsSectionIntroduction"
import DocsSectionCollections from "./DocsSectionCollections"
import DocsSectionYourCollections from "./DocsSectionYourCollections"
import DocsSectionAdmin from "./DocsSectionAdmin"
import DocsSectionFields from "./DocsSectionFields"
import DocsSectionFieldTypes from "./DocsSectionFieldsTypes"
import DocsSectionItems from "./DocsSectionItems"

function Docs({ collections }: { collections: CollectionFieldsData[] }) {
  return (
    <>
      <div className="px-8 pb-16">
        <DocsSectionIntroduction />
      </div>
      <h2 className="px-8 text-sm font-semibold text-blue-500 uppercase tracking-widest">Overview</h2>
      <div className="flex flex-col gap-12 px-8">
        <DocsSectionAdmin />
        <DocsSectionCollections />
        <DocsSectionFields />
        <DocsSectionFieldTypes />
        <DocsSectionItems />
        <h2 className="text-sm font-semibold text-blue-500 uppercase tracking-widest relative top-8">Your Collections</h2>
        <DocsSectionYourCollections collections={collections} />
      </div>
    </>
  )
}

export default Docs
