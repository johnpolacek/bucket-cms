import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { options } from "../../../../../app/bucket/options"
import { ListObjectsV2Command } from "@aws-sdk/client-s3"
import { initializeS3Client, getBucketName } from "../../s3/util"

export async function GET() {
  const session = await getServerSession(options)
  if ((process.env.NODE_ENV !== "development" || process.env.USE_SANDBOX === "true") && !session?.user) {
    return NextResponse.json({ error: `Not Authorized` }, { status: 401 })
  }

  const s3 = initializeS3Client()
  const bucketName = await getBucketName()

  try {
    console.log({ bucketName })
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

    return NextResponse.json({ collections: collectionsWithCounts }, { status: 200 })
  } catch (error: any) {
    console.error("Error fetching collections from S3:", error) // Log the error for debugging

    if (error.name === "NoSuchBucket") {
      return NextResponse.json({ error: { message: "The specified bucket does not exist", bucketName } }, { status: 400 })
    }

    return NextResponse.json({ error }, { status: 500 }) // Return the error message
  }
}
