"use client"
import { Button } from "../../ui"
import { cn } from "../../ui/utils"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Transition } from "@headlessui/react"
import { useFetchCollectionItems } from "../../hooks"
import { Collection, CollectionData } from "../../types"
import CollectionManageItem from "./CollectionManageItem"
import CollectionManageEmpty from "./CollectionManageEmpty"
import CollectionManageNavHeader from "./CollectionManageNavHeader"
import CollectionDataDocumentation from "../dev/CollectionDataDocumentation"

function CollectionManage({ collection, collections }: { collection: Collection; collections: CollectionData[] | null }) {
  const [showDocs, setShowDocs] = useState(window.innerWidth > 768)
  const router = useRouter()
  const { items, loading, error } = useFetchCollectionItems(collection.name)

  return (
    <>
      {!loading && (
        <>
          <CollectionManageNavHeader otherCollections={collections?.filter((c) => c.collectionName !== collection.name)} />
          <div className="flex items-center justify-center w-full mt-8 sm:mt-0">
            <Transition appear={true} show={true} enter="transition-all duration-300" enterFrom="opacity-0 translate-y-4" enterTo="opacity-100 translate-y-0" className="sm:px-8 w-full">
              <h3 className="w-full text-center uppercase tracking-wide opacity-50 text-sm">Manage</h3>
              <h4 className="w-full text-center font-semibold text-4xl pb-6">{collection.name}</h4>
              <div
                className={cn("flex w-full max-w-[1280px] relative mx-auto sm:my-4 p-4 sm:p-12 sm:divide-x sm:border rounded-xl sm:shadow transition-all ease-in-out", showDocs ? "gap-12" : "gap-8")}
              >
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
                  {items.length === 0 && <CollectionManageEmpty collectionName={collection.name} />}
                  {items.map((item) => (
                    <CollectionManageItem key={item.itemId} item={item} collectionName={collection.name} />
                  ))}
                  {items.length > 0 && (
                    <div className="w-full text-right my-4">
                      <Button onClick={() => router.push("./collection/" + collection.name.replace(/\s+/g, "_") + "/item/new")} variant="outline" className="text-green-600">
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
                  {collection && showDocs && <CollectionDataDocumentation collection={collection} />}
                </div>
              </div>
            </Transition>
          </div>
        </>
      )}
    </>
  )
}

export default CollectionManage
