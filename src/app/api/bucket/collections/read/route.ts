import { getServerSession } from "next-auth/next"
import { options } from "../../../../../app/bucket/options"
import { NextRequest, NextResponse } from "next/server"
import { getBucketName, readCollections } from "../../s3/util"

export async function GET(req: NextRequest) {
  const session = await getServerSession(options)
  if ((process.env.NODE_ENV !== "development" || process.env.USE_SANDBOX === "true") && !session?.user) {
    return NextResponse.json({ error: `Not Authorized` }, { status: 401 })
  }

  const bucketNamePublic = await getBucketName(false)
  const bucketNamePrivate = await getBucketName(true)
  try {
    const collectionsPublic = await readCollections(bucketNamePublic)
    const collectionsPrivate = await readCollections(bucketNamePrivate)

    return NextResponse.json({ collections: [...collectionsPublic, ...collectionsPrivate] }, { status: 200 })
  } catch (error: any) {
    console.error("Error fetching collections from S3:", error) // Log the error for debugging

    if (error.name === "NoSuchBucket") {
      return NextResponse.json({ error: { message: "The specified bucket does not exist", bucketNamePublic } }, { status: 400 })
    }

    return NextResponse.json({ error: error.message || "Failed to fetch collections" }, { status: 500 }) // Return the error message
  }
}
