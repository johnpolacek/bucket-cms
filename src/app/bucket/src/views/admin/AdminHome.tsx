"use client"
import React, { useState } from "react"
import CollectionsList from "./CollectionsList"
import CollectionManage from "./CollectionManage"
import CollectionForm from "./CollectionForm"
import ItemForm from "./ItemForm"
import { CollectionData } from "../../types"

function AdminHome({ onUpdateCollection }: { onUpdateCollection: () => void }) {
  const [manageCollection, setManageCollection] = useState<CollectionData | undefined>(undefined)
  const [createItemInCollection, setCreateItemInCollection] = useState<CollectionData | undefined>(undefined)
  const [isCreatingCollection, setIsCreatingCollection] = useState(false)

  return (
    <div className="py-12">
      {manageCollection ? (
        <CollectionManage
          onCreateItem={(collectionData) => {
            setManageCollection(undefined)
            setCreateItemInCollection(collectionData)
          }}
          onFinish={() => setManageCollection(undefined)}
          collectionData={manageCollection}
        />
      ) : (
        <>
          {createItemInCollection ? (
            <ItemForm collectionData={createItemInCollection} onCancel={() => setCreateItemInCollection(undefined)} onComplete={() => setCreateItemInCollection(undefined)} />
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
