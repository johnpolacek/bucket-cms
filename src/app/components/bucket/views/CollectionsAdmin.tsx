"use client"
import React, { useState } from "react"
import CollectionsList from "./CollectionsList"
import ItemForm from "./ItemForm"

function CollectionsAdmin({ collectionNames }: { collectionNames: string[] }) {
  const [manageCollection, setManageCollection] = useState("")
  const [createItemInCollection, setCreateItemInCollection] = useState("")

  return (
    <div className="min-w-[420px]">
      {manageCollection ? (
        <div>Manage {manageCollection}</div>
      ) : (
        <>
          {createItemInCollection ? (
            <ItemForm collectionName={createItemInCollection} onCancel={() => setCreateItemInCollection("")} onComplete={() => setCreateItemInCollection("")} />
          ) : (
            <CollectionsList collectionNames={collectionNames} onCreate={setCreateItemInCollection} onManage={setManageCollection} />
          )}
        </>
      )}
    </div>
  )
}

export default CollectionsAdmin
