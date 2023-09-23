import { GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3"
import { initializeS3Client } from "../util"
import { Collection } from "../../../../bucket/src/types"
import { Readable } from "stream"

export async function readCollections(bucketName: string) {
  const s3 = initializeS3Client()
  const command = new ListObjectsV2Command({
    Bucket: bucketName,
    Prefix: "collections/", // The prefix for the files
  })
  const response = await s3.send(command)

  const collectionKeys = response.Contents?.map((item) => item.Key) || []

  // Fetch the content of each collection file
  const collections = await Promise.all(
    collectionKeys.map(async (collectionKey) => {
      const getCommand = new GetObjectCommand({
        Bucket: bucketName,
        Key: collectionKey,
      })

      const { Body } = await s3.send(getCommand)

      if (Body instanceof Readable) {
        const data = await new Promise<string>((resolve, reject) => {
          const chunks: any[] = []
          Body.on("data", (chunk) => chunks.push(chunk))
          Body.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")))
          Body.on("error", reject)
        })

        return JSON.parse(data) as Collection
      }

      throw new Error(`Failed to retrieve collection data for key ${collectionKey}`)
    })
  )
  return collections
}
