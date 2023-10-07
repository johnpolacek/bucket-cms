import { useState } from "react"
import { ItemPayload } from "../types"

export const useUpdateItem = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const updateItem = async (payload: ItemPayload) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/bucket/item/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to update the item.")
      }

      return await response.json()
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return { updateItem, isLoading, error }
}
