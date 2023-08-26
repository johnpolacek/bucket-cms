import { NextRequest, NextResponse } from "next/server"
import { ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3"
import { Readable } from "stream"
import { initializeS3Client } from "../../s3/util"

export async function GET(req: NextRequest) {
  const s3 = initializeS3Client()

  const collectionName = req.nextUrl.searchParams.get("collectionName")
  const token = req.nextUrl.searchParams.get("token") // ContinuationToken for pagination

  if (!collectionName) {
    return NextResponse.json({ error: "Collection name is required as a query parameter" }, { status: 400 })
  }

  const MAX_ITEMS_PER_PAGE = 20

  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Prefix: `items/${collectionName}/`,
      MaxKeys: MAX_ITEMS_PER_PAGE,
      ContinuationToken: token || undefined,
    })

    const response = await s3.send(command)

    const itemsPromises = response.Contents?.map(async (item) => {
      const itemId = item.Key?.split("/").pop()?.replace(".json", "")

      // Fetch the JSON content for each item
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

    return NextResponse.json(
      {
        items,
        nextToken: response.NextContinuationToken, // Provide this token in the next request to fetch the next page
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error fetching items from S3:", error) // Log the error for debugging
    return NextResponse.json({ error }, { status: 500 }) // Return the error message
  }
}

// Utility function to convert a readable stream to a string
function streamToString(stream: Readable): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: any[] = []
    stream.on("data", (chunk) => chunks.push(chunk))
    stream.on("error", reject)
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")))
  })
}
