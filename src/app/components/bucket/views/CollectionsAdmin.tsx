"use client"
import React, { useState } from "react"
import CollectionsList from "./CollectionsList"

function CollectionsAdmin({ collectionNames }: { collectionNames: string[] }) {
  const [manageCollection, setManageCollection] = useState("")
  const [isCreatingItem, setIsCreatingItem] = useState(false)

  return (
    <div className="min-w-[420px]">
      {manageCollection ? (
        <div>Manage {manageCollection}</div>
      ) : (
        <>
          {isCreatingItem ? (
            <>
              <h3 className="text-center font-semibold text-xl">Create Item</h3>
            </>
          ) : (
            <CollectionsList
              collectionNames={collectionNames}
              onCreate={() => {
                setIsCreatingItem(true)
              }}
              onManage={setManageCollection}
            />
          )}
        </>
      )}
    </div>
  )
}

export default CollectionsAdmin
