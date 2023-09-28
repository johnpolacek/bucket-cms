import { useState, useEffect } from "react"
import { ConfigValidation } from "../types"

export const useConfigValidation = () => {
  const [configValidation, setConfigValidation] = useState<undefined | ConfigValidation>(undefined)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchConfigValidation = async () => {
      try {
        const response = await fetch("/api/bucket/config/read")
        const data: ConfigValidation = await response.json()
        setConfigValidation(data)
      } catch (error: any) {
        setError(error.message || "Failed to load config validation data")
      }
    }

    fetchConfigValidation()
  }, [])

  return { configValidation, error }
}
