import { NextRequest, NextResponse } from "next/server"
import { ListObjectsV2Command } from "@aws-sdk/client-s3"
import { initializeS3Client, getBucketName } from "../../s3/util"

export async function GET(req: NextRequest) {
  const s3 = initializeS3Client()

  // Extracting collectionName from the query parameters
  const collectionName = req.nextUrl.searchParams.get("collectionName")

  if (!collectionName) {
    return NextResponse.json({ error: "Collection name is required as a query parameter" }, { status: 400 })
  }

  try {
    const bucketName = await getBucketName()
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: `items/${collectionName}/`,
    })

    const { Contents } = await s3.send(command)

    if (Contents) {
      // Count the number of items (excluding folders)
      const itemCount = Contents.filter((item) => !item?.Key?.endsWith("/")).length
      return NextResponse.json({ itemCount }, { status: 200 })
    }

    return NextResponse.json({ error: "Failed to retrieve item count" }, { status: 500 })
  } catch (error) {
    return NextResponse.json({ error: `Failed to count items: ${String(error)}` }, { status: 500 })
  }
}
