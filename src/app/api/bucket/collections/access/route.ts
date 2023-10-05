import { NextResponse } from "next/server"
import { getBucketName } from "../../s3/util"

export async function GET(): Promise<void | NextResponse> {
  const bucketName = await getBucketName()

  try {
    const publicBlockRead = (process.env.BLOCK_API_PUBLIC_READ || "").split(",")
    const publicAllowWrite = (process.env.ALLOW_API_PUBLIC_WRITE || "").split(",")

    return NextResponse.json({ publicBlockRead, publicAllowWrite }, { status: 200 })
  } catch (error: any) {
    console.error("Error fetching collections from S3:", error)

    if (error.name === "NoSuchBucket") {
      return NextResponse.json({ error: { message: "The specified bucket does not exist", bucketName } }, { status: 400 })
    }

    return NextResponse.json({ error: error.message || "Failed to fetch collections" }, { status: 500 }) // Return the error message
  }
}
