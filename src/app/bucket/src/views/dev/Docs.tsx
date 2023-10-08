import React, { useEffect } from "react"
import { CollectionFieldsData } from "../../types"
import DocsSectionIntroduction from "./DocsSectionIntroduction"
import DocsSectionS3 from "./DocsSectionS3"
import DocsSectionInstall from "./DocsSectionInstall"
import DocsSectionCollections from "./DocsSectionCollections"
import DocsSectionYourCollections from "./DocsSectionYourCollections"
import DocsSectionAdmin from "./DocsSectionAdmin"
import DocsSectionFields from "./DocsSectionFields"
import DocsSectionFieldTypes from "./DocsSectionFieldsTypes"
import DocsSectionItems from "./DocsSectionItems"
import Prism from "prismjs"
import "prismjs/components/prism-typescript"

function Docs({ collections }: { collections: CollectionFieldsData[] }) {
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <>
      <div className="px-8 pb-16">
        <DocsSectionIntroduction />
        <h2 className="text-sm font-semibold text-blue-500 uppercase tracking-widest pt-16">Quick Start</h2>
        <div className="flex flex-col gap-12">
          <DocsSectionS3 />
          <DocsSectionInstall />
        </div>
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
