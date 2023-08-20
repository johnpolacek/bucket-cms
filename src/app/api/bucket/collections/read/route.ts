import { NextRequest, NextResponse } from "next/server"
import { ListObjectsV2Command } from "@aws-sdk/client-s3"
import { initializeS3Client } from "../../s3/util"

export async function GET(req: NextRequest) {
  const s3 = initializeS3Client()

  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Prefix: "collections/", // The prefix for the files
    })
    const response = await s3.send(command)

    // Log the response for debugging
    console.log("S3 Response:", response)

    // Extract file names (keys) from the response
    const collectionNames = response.Contents?.map((item) => item.Key?.replace(".json", "")) || []

    return NextResponse.json({ collectionNames }, { status: 200 })
  } catch (error) {
    console.error("Error fetching collections from S3:", error) // Log the error for debugging
    return NextResponse.json({ error }, { status: 500 }) // Return the error message
  }
}
