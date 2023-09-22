import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { options } from "../../../../../app/bucket/options"
import { getBucketName, readCollectionCounts } from "../../s3/util"

export async function GET() {
  const session = await getServerSession(options)
  if ((process.env.NODE_ENV !== "development" || process.env.USE_SANDBOX === "true") && !session?.user) {
    return NextResponse.json({ error: `Not Authorized` }, { status: 401 })
  }

  const bucketNamePublic = await getBucketName(false)
  const bucketNamePrivate = await getBucketName(true)

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
