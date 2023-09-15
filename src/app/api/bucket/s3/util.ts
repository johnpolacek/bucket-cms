import { S3Client, GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3"
import { getServerSession } from "next-auth/next"
import { options } from "../../../../app/bucket/options"
import { CollectionItemData } from "../../../bucket/src/types"
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

export const getBucketName = async (): Promise<string> => {
  let prefix = ""
  if (process.env.USE_SANDBOX === "true") {
    let session = await getServerSession(options)
    prefix =
      session?.user?.email
        ?.toLowerCase()
        .replace("@", "-")
        .replace(/[^a-z0-9.\-_]/g, "")
        .replace(/\./g, "-") ?? ""
  }
  console.log("getBucketName " + process.env.AWS_S3_BUCKET_NAME ? prefix + process.env.AWS_S3_BUCKET_NAME : "")
  return process.env.AWS_S3_BUCKET_NAME ? prefix + "-" + process.env.AWS_S3_BUCKET_NAME : ""
}

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

// Helper function to convert a Readable stream to a string
export const streamToString = (stream: Readable): Promise<string> => {
  const chunks: any[] = []
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => chunks.push(chunk))
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")))
    stream.on("error", reject)
  })
}

export const doesItemExist = async (collectionName: string, slug: string) => {
  const s3 = initializeS3Client()
  const itemKey = `items/${collectionName}/${slug}.json`
  try {
    const bucketName = await getBucketName()
    await s3.send(
      new GetObjectCommand({
        Bucket: bucketName,
        Key: itemKey,
      })
    )
    return true
  } catch (error) {
    return false
  }
}
