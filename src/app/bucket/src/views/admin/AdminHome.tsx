"use client"
import React from "react"
import CollectionsList from "./CollectionsList"
import { useFetchCollectionsCount } from "../../hooks"

function AdminHome() {
  const [collections, isLoading, error] = useFetchCollectionsCount(true)

  return <>{!isLoading && <div className="py-12">{collections && <CollectionsList collections={collections} />}</div>}</>
}

export default AdminHome
