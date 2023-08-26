import { NextRequest, NextResponse } from "next/server"
import { initializeS3Client } from "../../s3/util"
import { DeleteObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3"

export async function DELETE(req: NextRequest) {
  const s3 = initializeS3Client()

  // Extracting collectionName from the query parameters
  const collectionName = req.nextUrl.searchParams.get("collectionName")

  if (!collectionName) {
    return NextResponse.json({ error: "Collection name is required as a query parameter" }, { status: 400 })
  }

  try {
    // Check if there are any items in the collection
    const listCommand = new ListObjectsV2Command({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Prefix: `items/${collectionName}/`,
    })
    const listResponse = await s3.send(listCommand)

    if (listResponse.KeyCount && listResponse.KeyCount > 0) {
      return NextResponse.json({ error: "The collection has items in it and cannot be deleted." }, { status: 400 })
    }

    // If no items, proceed to delete the collection
    const deleteCommand = new DeleteObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `collections/${collectionName}.json`,
    })
    await s3.send(deleteCommand)

    return NextResponse.json({ success: true, message: "Collection deleted successfully." }, { status: 200 })
  } catch (error) {
    console.error("Error deleting collection:", error) // Log the error for debugging
    return NextResponse.json({ error: `Failed to delete collection: ${String(error)}` }, { status: 500 })
  }
}
