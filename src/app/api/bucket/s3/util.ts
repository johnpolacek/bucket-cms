import { S3Client, GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3"
import { Readable } from "stream"

export const initializeS3Client = (): S3Client => {
  return new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
  })
}

export const readCollectionItem = async (collectionName: string, itemId: string) => {
  const s3 = initializeS3Client()

  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `items/${collectionName}/${itemId}.json`,
  })

  try {
    const { Body } = await s3.send(command)
    const data = await streamToString(Body as Readable)
    const jsonData = JSON.parse(data)
    return jsonData
  } catch (error) {
    throw error
  }
}

export const readCollectionItems = async (collectionName: string, token?: string) => {
  const s3 = initializeS3Client()
  const MAX_ITEMS_PER_PAGE = 100 // You can adjust this value based on your needs

  const command = new ListObjectsV2Command({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Prefix: `items/${collectionName}/`,
    MaxKeys: MAX_ITEMS_PER_PAGE,
    ContinuationToken: token || undefined,
  })

  try {
    const response = await s3.send(command)

    const itemsPromises = response.Contents?.map(async (item) => {
      const itemId = item.Key?.split("/").pop()?.replace(".json", "")
      const itemCommand = new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: item.Key!,
      })
      const { Body } = await s3.send(itemCommand)
      const data = await streamToString(Body as Readable)
      const itemData = JSON.parse(data)

      return {
        itemId,
        ...itemData,
      }
    })

    const items = await Promise.all(itemsPromises || [])
    return items
  } catch (error) {
    throw error
  }
}

// Helper function to convert a Readable stream to a string
const streamToString = (stream: Readable): Promise<string> => {
  const chunks: any[] = []
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => chunks.push(chunk))
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")))
    stream.on("error", reject)
  })
}
