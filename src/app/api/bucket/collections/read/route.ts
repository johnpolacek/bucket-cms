import { NextRequest, NextResponse } from "next/server"
import { ListObjectsV2Command } from "@aws-sdk/client-s3"
import { initializeS3Client } from "../../s3/util"

export async function GET(req: NextRequest) {
  const s3 = initializeS3Client()

  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Prefix: "collections/", // The prefix for the files
    })
    const response = await s3.send(command)

    // Extract file names (keys) from the response
    const collectionNames = response.Contents?.map((item) => item.Key?.replace("collections/", "").replace(".json", "")) || []

    // Fetch item counts for each collection
    const collectionsWithCounts = await Promise.all(
      collectionNames.map(async (collectionName) => {
        const itemCommand = new ListObjectsV2Command({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Prefix: `items/${collectionName}/`,
        })
        const itemResponse = await s3.send(itemCommand)
        const itemCount = itemResponse.KeyCount || 0
        return { collectionName, itemCount }
      })
    )

    return NextResponse.json({ collections: collectionsWithCounts }, { status: 200 })
  } catch (error) {
    console.error("Error fetching collections from S3:", error) // Log the error for debugging
    return NextResponse.json({ error }, { status: 500 }) // Return the error message
  }
}
