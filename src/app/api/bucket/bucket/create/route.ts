import { NextRequest, NextResponse } from "next/server"
import { initializeS3Client } from "../../s3/util"
import { CreateBucketCommand } from "@aws-sdk/client-s3"

export async function POST(req: NextRequest) {
  const s3 = initializeS3Client()

  if (req.method === "POST") {
    try {
      const command = new CreateBucketCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
      })
      await s3.send(command)
      return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 })
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 })
  }
}
