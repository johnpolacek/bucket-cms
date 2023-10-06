"use client"
import React, { useState } from "react"
import { Button } from "../../ui"
import { CollectionData } from "../../types"
import TransitionWrapper from "./TransitionWrapper"
import Link from "next/link"
import CollectionsEmpty from "./CollectionsEmpty"
import CollectionsListRow from "./CollectionsListRow"

function CollectionsList({
  onCreateItem,
  onManage,
  collections: initialCollections,
}: {
  onCreateItem: (collection: CollectionData) => void
  onManage: (collection: CollectionData) => void
  collections: CollectionData[]
}) {
  const [collections, setCollections] = useState(initialCollections)

  const onDeleteCollection = async (collection: CollectionData) => {
    setCollections((prevCollections: CollectionData[]) => prevCollections.filter((col) => col.collectionName !== collection.collectionName))
  }

  return (
    <div className="flex flex-col">
      <TransitionWrapper>
        <h3 className="text-center font-semibold text-3xl mt-4 sm:mt-0">Your Collections</h3>
      </TransitionWrapper>
      <>
        {collections.length > 0 ? (
          <TransitionWrapper>
            <div className="flex flex-col sm:flex-row justify-center">
              <div className="sm:my-8 sm:border bg-white p-8 sm:rounded-xl sm:shadow">
                <div className="border-t">
                  {collections.map((collection: CollectionData) => (
                    <CollectionsListRow key={collection.collectionName} collection={collection} onManage={onManage} onCreateItem={onCreateItem} onDelete={onDeleteCollection} />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Link href="./admin/collection/new">
                <Button className="text-lg py-3 h-auto text-white bg-blue-600 hover:bg-blue-600 hover:scale-105 transition-all" size="lg">
                  + Create New Collection
                </Button>
              </Link>
            </div>
          </TransitionWrapper>
        ) : (
          <CollectionsEmpty />
        )}
      </>
    </div>
  )
}

export default CollectionsList
