import { GetObjectCommand } from "@aws-sdk/client-s3"
import { CollectionItemData } from "../../../../bucket/src/types"
import { Readable } from "stream"
import { initializeS3Client, getBucketName, streamToString } from "../util"

export const readCollectionItem = async (collectionName: string, itemId: string) => {
  const s3 = initializeS3Client()

  const bucketName = await getBucketName()
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: `items/${collectionName}/${itemId}.json`,
  })

  try {
    const { Body } = await s3.send(command)
    const data = await streamToString(Body as Readable)
    const jsonData = JSON.parse(data)
    const itemData: CollectionItemData = { itemId, ...jsonData }
    return itemData
  } catch (error) {
    throw error
  }
}
