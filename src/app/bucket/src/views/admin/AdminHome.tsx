"use client"
import React, { useState } from "react"
import CollectionsList from "./CollectionsList"
import CollectionManage from "./CollectionManage"
import { CollectionData } from "../../types"
import { useFetchCollectionsCount } from "../../hooks"

function AdminHome() {
  const [manageCollection, setManageCollection] = useState<CollectionData | undefined>(undefined)
  const [createItemInCollection, setCreateItemInCollection] = useState<CollectionData | undefined>(undefined)
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
            <>{collections && <CollectionsList collections={collections} onCreateItem={setCreateItemInCollection} onManage={setManageCollection} />}</>
          )}
        </div>
      )}
    </>
  )
}

export default AdminHome
