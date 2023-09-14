import { NextRequest, NextResponse } from "next/server"
import { DeleteObjectCommand } from "@aws-sdk/client-s3"
import { getServerSession } from "next-auth"
import { options } from "../../../../../app/bucket/options"
import { initializeS3Client, getBucketName } from "../../s3/util"

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(options)
  if ((process.env.NODE_ENV !== "development" || process.env.USE_SANDBOX === "true") && !session?.user) {
    return NextResponse.json({ error: `Not Authorized` }, { status: 401 })
  }

  const s3 = initializeS3Client()

  // Extracting collectionName and itemId from the query parameters
  const collectionName = req.nextUrl.searchParams.get("collectionName")
  const itemId = req.nextUrl.searchParams.get("itemId")

  if (!collectionName || !itemId) {
    return NextResponse.json({ error: "Both collection name and item ID are required as query parameters" }, { status: 400 })
  }

  try {
    const bucketName = await getBucketName()
    const deleteCommand = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: `items/${collectionName}/${itemId}.json`,
    })

    await s3.send(deleteCommand)

    return NextResponse.json({ message: "Item successfully deleted" }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: `Failed to delete item: ${String(error)}` }, { status: 500 })
  }
}
