import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { options } from "../../../../../app/bucket/options"
import { ListObjectsV2Command } from "@aws-sdk/client-s3"
import { initializeS3Client, getBucketName } from "../../s3/util"

export async function GET(req: NextRequest) {
  if (process.env.BLOCK_API_READ_ACCESS === "true") {
    const session = await getServerSession(options)
    if ((process.env.NODE_ENV !== "development" || process.env.USE_SANDBOX === "true") && !session?.user) {
      return NextResponse.json({ error: `Not Authorized` }, { status: 401 })
    }
  }
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
