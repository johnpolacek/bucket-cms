"use client"
import React, { useState } from "react"
import { CollectionData } from "../../types"
import CollectionForm from "./CollectionForm"
import { useCollectionFieldData } from "../../hooks"

function CollectionEdit({ collectionData, onCancel, onComplete }: { collectionData: CollectionData; onCancel: () => void; onComplete: () => void }) {
  const { collection } = useCollectionFieldData(collectionData)
  console.log({ collectionData })
  return <>{collection && <CollectionForm collection={collection} onCancel={onCancel} onComplete={onComplete} />}</>
}

export default CollectionEdit
