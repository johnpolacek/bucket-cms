"use client"
import React from "react"
import { CollectionFieldsData } from "../../types"
import CollectionDataDocumentation from "./CollectionDataDocumentation"

function CollectionData({ collection }: { collection: CollectionFieldsData }) {
  return (
    <section id={collection.name}>
      <h3 className="text-xl pl-1 py-4 tracking-wide font-semibold">{collection.name}</h3>
      <CollectionDataDocumentation collection={collection} />
    </section>
  )
}

export default CollectionData
