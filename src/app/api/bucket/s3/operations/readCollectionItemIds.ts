import { ListObjectsV2Command } from "@aws-sdk/client-s3"
import { initializeS3Client, getBucketName } from "../util"

export async function readCollectionItemIDs(collectionName: string, token?: string): Promise<string[]> {
  const s3 = initializeS3Client()

  const bucketName = await getBucketName()
  const command = new ListObjectsV2Command({
    Bucket: bucketName,
    Prefix: `items/${collectionName}/`,
    ContinuationToken: token || undefined,
  })

  try {
    const response = await s3.send(command)

    const itemIDs: string[] =
      response.Contents?.map((item) => {
        const itemId = item.Key?.split("/").pop()?.replace(".json", "")
        if (!itemId) {
          throw new Error("Failed to derive itemId from the S3 key")
        }
        return itemId
      }) || []

    return itemIDs
  } catch (error) {
    throw error
  }
}
