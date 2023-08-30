import { NextRequest, NextResponse } from "next/server"
import { ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3"
import { Readable } from "stream"
import { initializeS3Client } from "../../s3/util"
import { Collection } from "../../../../bucket/src/types"

export async function GET(req: NextRequest) {
  const s3 = initializeS3Client()

  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Prefix: "collections/", // The prefix for the files
    })
    const response = await s3.send(command)

    const collectionKeys = response.Contents?.map((item) => item.Key) || []

    // Fetch the content of each collection file
    const collections = await Promise.all(
      collectionKeys.map(async (collectionKey) => {
        const getCommand = new GetObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
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

    return NextResponse.json({ collections }, { status: 200 })
  } catch (error: any) {
    console.error("Error fetching collections from S3:", error) // Log the error for debugging
    return NextResponse.json({ error: error.message || "Failed to fetch collections" }, { status: 500 }) // Return the error message
  }
}
