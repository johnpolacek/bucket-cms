"use client"
import React, { useEffect, useState } from "react"
import { CollectionFetch } from "../../types"
import CollectionData from "./CollectionData"

function DevHome() {
  const [loading, setLoading] = useState(true)
  const [collections, setCollections] = useState<CollectionFetch[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch("/api/bucket/collections/read")
        if (!response.ok) {
          throw new Error("Failed to fetch collections")
        }

        const data = await response.json()
        setCollections(data.collections)
        setLoading(false)
      } catch (error: any) {
        setError(error.message)
      }
    }

    fetchCollections()
  }, [])

  return (
    <div className="min-w-[420px]">
      {!loading && (
        <div>
          {collections.length === 0 ? (
            <p>No collections found.</p>
          ) : (
            <>
              <h3 className="text-center font-semibold text-3xl pb-8">Your Collections</h3>
              {collections.map((collection) => (
                <CollectionData collection={collection} />
              ))}
            </>
          )}
        </div>
      )}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  )
}

export default DevHome
