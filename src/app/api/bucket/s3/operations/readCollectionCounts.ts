import { ListObjectsV2Command } from "@aws-sdk/client-s3"
import { initializeS3Client } from "../util"

export async function readCollectionCounts(bucketName: string) {
  const s3 = initializeS3Client()
  const command = new ListObjectsV2Command({
    Bucket: bucketName,
    Prefix: "collections/", // The prefix for the files
  })
  const response = await s3.send(command)

  // Extract file names (keys) from the response
  const collectionNames = response.Contents?.map((item) => item.Key?.replace("collections/", "").replace(".json", "")) || []

  // Fetch item counts for each collection
  const collectionsWithCounts = await Promise.all(
    collectionNames.map(async (collectionName) => {
      const itemCommand = new ListObjectsV2Command({
        Bucket: bucketName,
        Prefix: `items/${collectionName}/`,
      })
      const itemResponse = await s3.send(itemCommand)
      const itemCount = itemResponse.KeyCount || 0
      return { collectionName, itemCount }
    })
  )
  return collectionsWithCounts
}
