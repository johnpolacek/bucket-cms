import { useState, useEffect } from "react"
import { CollectionData } from "../types"

function useFetchCollectionsCount(shouldFetch: boolean, refreshToken?: number): [CollectionData[] | null, boolean, Error | null, string | null] {
  const [collections, setCollections] = useState<CollectionData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [missingBucketName, setMissingBucketName] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCollections() {
      try {
        const response = await fetch("/api/bucket/collections/count")
        const responseData = await response.json()
        if (!response.ok) {
          console.log("responseData.error", responseData.error)
          if (responseData.error && responseData.error.bucketName) {
            setMissingBucketName(responseData.error.bucketName)
          }
          throw new Error(responseData.error.message || "Failed to fetch collections.")
        }
        setCollections(responseData.collections)
      } catch (err: any) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    if (shouldFetch) {
      fetchCollections()
    }
  }, [shouldFetch])

  return [collections, loading, error, missingBucketName]
}

export { useFetchCollectionsCount }
