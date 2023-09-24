import { useState } from "react"

export const useFetchItemIds = () => {
  const [error, setError] = useState<string | null>(null)

  const fetchItemsIds = async (collectionName: string): Promise<string[] | void> => {
    try {
      const response = await fetch(`/api/bucket/item/ids/read?collectionName=${collectionName}`)
      if (!response.ok) {
        throw new Error("Failed to fetch items")
      }
      const data = await response.json()
      return data.itemIds as string[]
    } catch (error: any) {
      setError(error.message)
      return
    }
  }

  return { fetchItemsIds, error }
}
