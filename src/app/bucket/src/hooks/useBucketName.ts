import { useState, useEffect } from "react"

export const useBucketName = () => {
  const [bucketName, setBucketName] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBucketName = async () => {
      try {
        const response = await fetch("/api/bucket/bucket/read")
        const data = await response.json()
        if (data.bucketName) {
          setBucketName(data.bucketName)
        }
      } catch (error: any) {
        setError(error.message || "Failed to load bucket name")
      }
    }

    fetchBucketName()
  }, [])

  return { bucketName, error }
}
