import { useState, useEffect } from "react"
import { CollectionAccessSettings } from "../types"

export const useCollectionAccessSettings = () => {
  const [collectionAccess, setCollectionAccess] = useState<CollectionAccessSettings | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCollectionAccessInfo = async () => {
      try {
        const response = await fetch(`/api/bucket/collections/access`)
        const data: CollectionAccessSettings = await response.json()
        setCollectionAccess(data)
      } catch (error: any) {
        setError(error.message || "Failed to load collection data")
      }
    }

    fetchCollectionAccessInfo()
  }, [])

  return { collectionAccess, error }
}
