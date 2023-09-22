import { useState, useEffect } from "react"
import { CollectionData, CollectionItemData } from "../types"

function useFetchCollectionItems(collectionData: CollectionData) {
  const [items, setItems] = useState<Array<CollectionItemData>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchItems = async () => {
    try {
      const response = await fetch(`/api/bucket/items/read?collectionName=${collectionData.collectionName}`)
      if (!response.ok) {
        throw new Error("Failed to fetch items")
      }
      const data = await response.json()
      setItems(data.items)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [collectionData.collectionName])

  return { items, loading, error, refresh: fetchItems }
}

export { useFetchCollectionItems }
