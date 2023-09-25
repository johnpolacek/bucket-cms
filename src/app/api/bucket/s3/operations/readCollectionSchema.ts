import { GetObjectCommand } from "@aws-sdk/client-s3"
import { initializeS3Client, getBucketName } from "../util"
import { Readable } from "stream"
import { Collection } from "../../../../bucket/src/types"

export const readCollectionSchema = async (collectionName: string): Promise<Collection | null> => {
  try {
    const s3 = initializeS3Client()
    const bucketName = await getBucketName()
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: `collections/${collectionName}.json`,
    })

    const { Body } = await s3.send(command)

    if (Body instanceof Readable) {
      const data = await new Promise<string>((resolve, reject) => {
        const chunks: any[] = []
        Body.on("data", (chunk) => chunks.push(chunk))
        Body.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")))
        Body.on("error", reject)
      })

      const jsonData: Collection = JSON.parse(data)
      return jsonData
    }

    throw new Error("Failed to retrieve collection data")
  } catch (error: any) {
    console.error(error.message || "Failed to load collection data")
    return null
  }
}
