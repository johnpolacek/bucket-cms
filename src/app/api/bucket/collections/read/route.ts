import { getServerSession } from "next-auth/next"
import { options } from "../../../../../app/bucket/options"
import { NextRequest, NextResponse } from "next/server"
import { getBucketName } from "../../s3/util"
import { readCollections } from "../../s3/operations"

export async function GET(req: NextRequest) {
  if (process.env.BLOCK_API_READ_ACCESS === "true") {
    const session = await getServerSession(options)
    if ((process.env.NODE_ENV !== "development" || process.env.USE_SANDBOX === "true") && !session?.user) {
      return NextResponse.json({ error: `Not Authorized` }, { status: 401 })
    }
  }

  const bucketNamePrivate = await getBucketName(false)
  const bucketNamePublic = await getBucketName(true)

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
