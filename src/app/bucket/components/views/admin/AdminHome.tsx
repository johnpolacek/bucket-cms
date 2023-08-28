"use client"
import React, { useState } from "react"
import CollectionsList from "./CollectionsList"
import CollectionManage from "./CollectionManage"
import CollectionForm from "./CollectionForm"
import ItemForm from "./ItemForm"
import { CollectionData } from "../../types"

function AdminHome({ collections, onCreateCollection }: { collections: CollectionData[]; onCreateCollection: () => void }) {
  const [manageCollection, setManageCollection] = useState("")
  const [createItemInCollection, setCreateItemInCollection] = useState("")
  const [isCreatingCollection, setIsCreatingCollection] = useState(false)

  return (
    <div className="min-w-[420px]">
      {manageCollection ? (
        <CollectionManage onFinish={() => setManageCollection("")} collectionName={manageCollection} />
      ) : (
        <>
          {createItemInCollection ? (
            <ItemForm collectionName={createItemInCollection} onCancel={() => setCreateItemInCollection("")} onComplete={() => setCreateItemInCollection("")} />
          ) : isCreatingCollection ? (
            <CollectionForm
              onCancel={() => setIsCreatingCollection(false)}
              onComplete={() => {
                setIsCreatingCollection(false)
                onCreateCollection()
              }}
            />
          ) : (
            <CollectionsList collections={collections} onCreateCollection={() => setIsCreatingCollection(true)} onCreateItem={setCreateItemInCollection} onManage={setManageCollection} />
          )}
        </>
      )}
    </div>
  )
}

export default AdminHome
