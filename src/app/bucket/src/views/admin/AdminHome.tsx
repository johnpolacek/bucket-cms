"use client"
import React, { useState } from "react"
import CollectionsList from "./CollectionsList"
import CollectionManage from "./CollectionManage"
import CollectionForm from "./CollectionForm"
import ItemForm from "./ItemForm"
import { CollectionData } from "../../types"
import { useFetchCollectionsCount } from "../../hooks"
import CollectionEdit from "./CollectionEdit"

function AdminHome({ onUpdateCollection }: { onUpdateCollection: () => void }) {
  const [manageCollection, setManageCollection] = useState<CollectionData | undefined>(undefined)
  const [createItemInCollection, setCreateItemInCollection] = useState<CollectionData | undefined>(undefined)
  const [isCreatingCollection, setIsCreatingCollection] = useState(false)
  const [editCollection, setEditCollection] = useState<CollectionData | undefined>(undefined)
  const [collections, isLoading, error] = useFetchCollectionsCount(true)

  return (
    <>
      {!isLoading && (
        <div className="py-12">
          {manageCollection ? (
            <CollectionManage
              collections={collections}
              onCreateItem={(collectionData) => {
                setManageCollection(undefined)
                setCreateItemInCollection(collectionData)
              }}
              onManage={setManageCollection}
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
                collections && (
                  <>
                    {editCollection ? (
                      <CollectionEdit collectionData={editCollection} onCancel={() => setEditCollection(undefined)} onComplete={() => setEditCollection(undefined)} />
                    ) : (
                      <CollectionsList
                        collections={collections}
                        onCreateCollection={() => setIsCreatingCollection(true)}
                        onCreateItem={setCreateItemInCollection}
                        onManage={setManageCollection}
                        onEdit={setEditCollection}
                      />
                    )}
                  </>
                )
              )}
            </>
          )}
        </div>
      )}
    </>
  )
}

export default AdminHome
