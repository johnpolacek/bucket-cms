import { GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3"
import { Readable } from "stream"
import { initializeS3Client, getBucketName, streamToString } from "../util"

export async function readCollectionItems<T extends { itemName: string; data: any }>(collectionName: string, token?: string): Promise<(T & { itemId: string })[]> {
  const s3 = initializeS3Client()
  const MAX_ITEMS_PER_PAGE = 100

  const bucketName = await getBucketName()
  const command = new ListObjectsV2Command({
    Bucket: bucketName,
    Prefix: `items/${collectionName}/`,
    MaxKeys: MAX_ITEMS_PER_PAGE,
    ContinuationToken: token || undefined,
  })

  try {
    const response = await s3.send(command)

    const itemsPromises = response.Contents?.map(async (item) => {
      const itemId = item.Key?.split("/").pop()?.replace(".json", "")
      if (!itemId) {
        throw new Error("Failed to derive itemId from the S3 key")
      }

      const itemCommand = new GetObjectCommand({
        Bucket: bucketName,
        Key: item.Key!,
      })
      const { Body } = await s3.send(itemCommand)
      const data = await streamToString(Body as Readable)
      const itemData: T = JSON.parse(data)

      return {
        ...itemData,
        itemId,
      }
    })

    const items: (T & { itemId: string })[] = await Promise.all(itemsPromises || [])
    return items
  } catch (error) {
    throw error
  }
}
