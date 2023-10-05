import { NextRequest, NextResponse } from "next/server"
import { initializeS3Client, getBucketName } from "../../s3/util"
import { checkPrivateWriteAccess } from "@/app/bucket/src/util"
import { CreateBucketCommand, DeletePublicAccessBlockCommand, PutBucketPolicyCommand } from "@aws-sdk/client-s3"

export async function POST(req: NextRequest): Promise<void | NextResponse> {
  const { error, response } = await checkPrivateWriteAccess()
  if (error) {
    return NextResponse.json({ error }, { status: 403 })
  }

  const s3 = initializeS3Client()

  if (req.method === "POST") {
    try {
      // Create the public bucket for public images and files
      const bucketNamePublic = await getBucketName(true)
      const createBucketCommand = new CreateBucketCommand({
        Bucket: bucketNamePublic,
        ObjectOwnership: "ObjectWriter",
      })
      await s3.send(createBucketCommand)

      // Delete the block public access
      const deletePublicAccessBlockCommand = new DeletePublicAccessBlockCommand({
        Bucket: bucketNamePublic,
      })
      await s3.send(deletePublicAccessBlockCommand)

      // Set the public access policy
      const bucketPolicy = {
        Version: "2012-10-17",
        Statement: [
          {
            Sid: "PublicReadGetObject",
            Effect: "Allow",
            Principal: "*",
            Action: "s3:GetObject",
            Resource: `arn:aws:s3:::${bucketNamePublic}/*`,
          },
        ],
      }

      const putBucketPolicyCommand = new PutBucketPolicyCommand({
        Bucket: bucketNamePublic,
        Policy: JSON.stringify(bucketPolicy),
      })
      await s3.send(putBucketPolicyCommand)

      // Create the private bucket
      const bucketName = await getBucketName(false)
      const createPrivateBucketCommand = new CreateBucketCommand({
        Bucket: bucketName,
        ObjectOwnership: "ObjectWriter",
      })
      await s3.send(createPrivateBucketCommand)

      return NextResponse.json({ success: true }, { status: 200 })
    } catch (error: any) {
      console.error("Error creating bucket:", error)

      if (error.name === "AccessDenied") {
        return NextResponse.json({ error }, { status: 403 })
      } else {
        return NextResponse.json({ error: error.message || "Failed to create bucket" }, { status: 500 })
      }
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 })
  }
}
