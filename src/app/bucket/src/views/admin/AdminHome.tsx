"use client"
import React, { useState } from "react"
import CollectionsList from "./CollectionsList"
import CollectionManage from "./CollectionManage"
import CollectionForm from "./CollectionForm"
import ItemForm from "./ItemForm"
import { CollectionData } from "../../types"

function AdminHome({ collections, onUpdateCollection }: { collections: CollectionData[]; onUpdateCollection: () => void }) {
  const [manageCollection, setManageCollection] = useState("")
  const [createItemInCollection, setCreateItemInCollection] = useState("")
  const [isCreatingCollection, setIsCreatingCollection] = useState(false)

  return (
    <div className="py-16">
      {manageCollection ? (
        <CollectionManage
          onCreateItem={(collectionName) => {
            setManageCollection("")
            setCreateItemInCollection(collectionName)
          }}
          onFinish={() => setManageCollection("")}
          collectionName={manageCollection}
        />
      ) : (
        <>
          {createItemInCollection ? (
            <ItemForm collectionName={createItemInCollection} onCancel={() => setCreateItemInCollection("")} onComplete={() => setCreateItemInCollection("")} />
          ) : isCreatingCollection ? (
            <CollectionForm
              onCancel={() => setIsCreatingCollection(false)}
              onComplete={() => {
                setIsCreatingCollection(false)
                onUpdateCollection()
              }}
            />
          ) : (
            <CollectionsList onCreateCollection={() => setIsCreatingCollection(true)} onCreateItem={setCreateItemInCollection} onManage={setManageCollection} />
          )}
        </>
      )}
    </div>
  )
}

export default AdminHome
