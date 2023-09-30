import { useState, useEffect } from "react"
import { CollectionFieldsData } from "../types"

export const useCollectionsList = () => {
  const [collections, setCollections] = useState<CollectionFieldsData[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch("/api/bucket/collections/read")
        if (!response.ok) {
          setError("Failed to fetch collections")
        } else {
          const data = await response.json()
          setCollections(data.collections)
        }
      } catch (error: any) {
        setError(error.message)
      }
    }
    fetchCollections()
  }, [])

  return { collections, error }
}
