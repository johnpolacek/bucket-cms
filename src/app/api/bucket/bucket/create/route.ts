import { NextRequest, NextResponse } from "next/server"
import { initializeS3Client } from "../../s3/util"
import { CreateBucketCommand, PutBucketPolicyCommand } from "@aws-sdk/client-s3"

export async function POST(req: NextRequest) {
  const s3 = initializeS3Client()

  if (req.method === "POST") {
    try {
      // Create the bucket
      const createBucketCommand = new CreateBucketCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
      })
      await s3.send(createBucketCommand)

      // Set the bucket policy to allow public read access
      const bucketPolicy = {
        Version: "2012-10-17",
        Statement: [
          {
            Sid: "PublicReadGetObject",
            Effect: "Allow",
            Principal: "*",
            Action: "s3:GetObject",
            Resource: `arn:aws:s3:::${process.env.AWS_S3_BUCKET_NAME}/*`,
          },
        ],
      }

      const putBucketPolicyCommand = new PutBucketPolicyCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Policy: JSON.stringify(bucketPolicy),
      })
      await s3.send(putBucketPolicyCommand)
      return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 })
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 })
  }
}
