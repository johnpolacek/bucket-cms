import { checkPublicReadAccess } from "../../../../bucket/src/util"
import { NextResponse } from "next/server"
import { getBucketName } from "../../s3/util"
import { readCollections } from "../../s3/operations"

export async function GET(): Promise<void | NextResponse> {
  const { error, response } = await checkPublicReadAccess()
  if (error) {
    return NextResponse.json({ error }, { status: 403 })
  }

  const bucketName = await getBucketName()

  try {
    const collections = await readCollections(bucketName)

    return NextResponse.json({ collections }, { status: 200 })
  } catch (error: any) {
    console.error("Error fetching collections from S3:", error)

    if (error.name === "NoSuchBucket") {
      return NextResponse.json({ error: { message: "The specified bucket does not exist", bucketName } }, { status: 400 })
    }

    return NextResponse.json({ error: error.message || "Failed to fetch collections" }, { status: 500 }) // Return the error message
  }
}
