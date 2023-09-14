import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { options } from "../../../../../app/bucket/options"
import { initializeS3Client, getBucketName } from "../../s3/util"
import { DeleteObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3"

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(options)
  if ((process.env.NODE_ENV !== "development" || process.env.USE_SANDBOX === "true") && !session?.user) {
    return NextResponse.json({ error: `Not Authorized` }, { status: 401 })
  }

  const s3 = initializeS3Client()

  // Extracting collectionName from the query parameters
  const collectionName = req.nextUrl.searchParams.get("collectionName")

  if (!collectionName) {
    return NextResponse.json({ error: "Collection name is required as a query parameter" }, { status: 400 })
  }

  try {
    // Check if there are any items in the collection
    const bucketName = await getBucketName()
    const listCommand = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: `items/${collectionName}/`,
    })
    const listResponse = await s3.send(listCommand)

    if (listResponse.KeyCount && listResponse.KeyCount > 0) {
      return NextResponse.json({ error: "The collection has items in it and cannot be deleted." }, { status: 400 })
    }

    // If no items, proceed to delete the collection
    const deleteCommand = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: `collections/${collectionName}.json`,
    })
    await s3.send(deleteCommand)

    return NextResponse.json({ success: true, message: "Collection deleted successfully." }, { status: 200 })
  } catch (error) {
    console.error("Error deleting collection:", error) // Log the error for debugging
    return NextResponse.json({ error: `Failed to delete collection: ${String(error)}` }, { status: 500 })
  }
}
