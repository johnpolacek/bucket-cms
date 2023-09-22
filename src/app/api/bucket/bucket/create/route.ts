import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { options } from "../../../../../app/bucket/options"
import { initializeS3Client, getBucketName } from "../../s3/util"
import { CreateBucketCommand, DeletePublicAccessBlockCommand, PutBucketPolicyCommand } from "@aws-sdk/client-s3"

export async function POST(req: NextRequest) {
  const s3 = initializeS3Client()

  const session = await getServerSession(options)
  if ((process.env.NODE_ENV !== "development" || process.env.USE_SANDBOX === "true") && !session?.user) {
    return NextResponse.json({ error: `Not Authorized` }, { status: 401 })
  }

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
      const bucketName = await getBucketName(true)
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
