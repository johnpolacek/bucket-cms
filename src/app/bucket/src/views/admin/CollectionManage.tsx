"use client"
import React, { useState } from "react"
import ItemForm from "./ItemForm"
import { Button } from "../../ui"
import { CollectionData, CollectionItemData } from "../../types"
import { Transition } from "@headlessui/react"
import { useCollectionFieldData, useFetchCollectionItems } from "../../hooks"
import CollectionDataDocumentation from "../dev/CollectionDataDocumentation"
import { cn } from "../../ui/utils"
import CollectionManageItem from "./CollectionManageItem"
import CollectionManageNavHeader from "./CollectionManageNavHeader"
import CollectionManageEmpty from "./CollectionManageEmpty"
import Link from "next/link"

function CollectionManage({
  collections,
  collectionData,
  onManage,
  onFinish,
  onCreateItem,
}: {
  collections: CollectionData[] | null
  collectionData: CollectionData
  onManage: (collection: CollectionData) => void
  onFinish: () => void
  onCreateItem: (collection: CollectionData) => void
}) {
  const { collection: collectionFieldData, error: collectionError } = useCollectionFieldData(collectionData.collectionName)
  const [editItem, setEditItem] = useState<CollectionItemData | null>(null)
  const [showDocs, setShowDocs] = useState(window.innerWidth > 768)

  const { items, loading, error, refresh } = useFetchCollectionItems(collectionData)

  return (
    <>
      <CollectionManageNavHeader otherCollections={collections?.filter((c) => c.collectionName !== collectionData.collectionName)} onSelectCollection={onManage} onFinish={onFinish} />
      {!editItem && !loading && (
        <div className="flex items-center justify-center w-full mt-8 sm:mt-0">
          <Transition appear={true} show={true} enter="transition-all duration-300" enterFrom="opacity-0 translate-y-4" enterTo="opacity-100 translate-y-0" className="sm:px-8 w-full">
            <h3 className="w-full text-center uppercase tracking-wide opacity-50 text-sm">Manage</h3>
            <h4 className="w-full text-center font-semibold text-4xl pb-6">{collectionData.collectionName}</h4>
            <div className={cn("flex w-full max-w-[1280px] relative mx-auto sm:my-4 p-4 sm:p-12 sm:divide-x sm:border rounded-xl sm:shadow transition-all ease-in-out", showDocs ? "gap-12" : "gap-8")}>
              <Button
                onClick={() => setShowDocs(!showDocs)}
                variant="outline"
                className={cn("md:hidden -top-[104px] sm:top-2 scale-75 sm:scale-90 text-gray-600 absolute right-0 sm:right-2", showDocs ?? "justify-start right-6")}
              >
                {showDocs ? (
                  <>
                    <span>hide docs </span>
                    <span className="font-light text-xl relative -right-1 -top-px">»</span>
                  </>
                ) : (
                  <>
                    <span className="font-light text-xl relative -left-1 -top-px">«</span>
                    <span className="whitespace-nowrap"> show docs</span>
                  </>
                )}
              </Button>
              <div className={cn("border-t transition-all ease-in-out grow", showDocs ? "w-full sm:w-1/2" : "w-full")}>
                {items.length === 0 && <CollectionManageEmpty collectionData={collectionData} onDelete={onFinish} onCreateItem={onCreateItem} />}
                {items.map((item) => (
                  <CollectionManageItem key={item.itemId} item={item} onEdit={() => setEditItem(item)} collectionData={collectionData} />
                ))}
                {items.length > 0 && (
                  <div className="w-full text-right my-4">
                    <Button onClick={() => onCreateItem(collectionData)} variant="outline" className="text-green-600">
                      + New
                    </Button>
                  </div>
                )}

                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && <ul></ul>}
              </div>
              <div
                className={cn(
                  "min-h-screen sm:min-h-0 bg-white sm:block px-4 sm:pl-12 overflow-auto relative transition-all ease-in-out",
                  showDocs ? "absolute z-10 top-0 left-0 sm:static w-full sm:block sm:w-1/2 grow" : "hidden w-auto shrink"
                )}
              >
                {collectionFieldData && showDocs && <CollectionDataDocumentation collection={collectionFieldData} />}
              </div>
            </div>
          </Transition>
        </div>
      )}
      {editItem && (
        <div className="py-4">
          <ItemForm
            collectionName={collectionData.collectionName}
            itemToEdit={editItem}
            onCancel={() => setEditItem(null)}
            onComplete={() => {
              setEditItem(null)
              refresh()
            }}
          />
        </div>
      )}
    </>
  )
}

export default CollectionManage
