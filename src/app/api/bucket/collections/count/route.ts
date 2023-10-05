import { NextResponse } from "next/server"
import { getBucketName } from "../../s3/util"
import { readCollectionCounts } from "../../s3/operations"
import { checkPublicReadAccess } from "@/app/bucket/src/util"

export async function GET(): Promise<void | NextResponse> {
  const { error, response } = await checkPublicReadAccess()
  if (error) {
    return NextResponse.json({ error }, { status: 403 })
  }

  const bucketNamePublic = await getBucketName(true)
  const bucketNamePrivate = await getBucketName(false)

  try {
    const publicCollectionCounts = await readCollectionCounts(bucketNamePublic)
    const privateCollectionCounts = await readCollectionCounts(bucketNamePrivate)

    return NextResponse.json({ collections: [...publicCollectionCounts, ...privateCollectionCounts] }, { status: 200 })
  } catch (error: any) {
    console.error("Error fetching collections from S3:", error) // Log the error for debugging

    if (error.name === "NoSuchBucket") {
      return NextResponse.json({ error: { message: "The specified bucket does not exist", bucketName: bucketNamePublic } }, { status: 400 })
    }

    return NextResponse.json({ error }, { status: 500 }) // Return the error message
  }
}
