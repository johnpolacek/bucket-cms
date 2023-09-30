import { useState, useEffect } from "react"
import { AIConfigValidation } from "../types"

export const useAIConfigValidation = () => {
  const [configValidation, setConfigValidation] = useState<undefined | AIConfigValidation>(undefined)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true) // Initialize loading state

  useEffect(() => {
    const fetchConfigValidation = async () => {
      setLoading(true) // Set loading to true at the beginning of the function
      try {
        const response = await fetch("/api/bucket/ai/config")
        const data: AIConfigValidation = await response.json()
        setConfigValidation(data)
      } catch (error: any) {
        setError(error.message || "Failed to load config validation data")
      } finally {
        setLoading(false)
      }
    }

    fetchConfigValidation()
  }, [])

  return { configValidation, error, loading }
}
