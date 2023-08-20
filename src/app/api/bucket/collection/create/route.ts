import { NextRequest, NextResponse } from "next/server"
import { initializeS3Client } from "../../s3/util"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { Collection } from "@/app/components/bucket/types"

export async function POST(req: NextRequest) {
  const s3 = initializeS3Client()

  if (req.method === "POST") {
    try {
      const data: Collection = await req.json()
      const collectionName = data.name

      // Convert the data to a JSON string
      const fileContent = JSON.stringify(data)

      // Upload the JSON string to S3
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `collections/${collectionName}.json`, // File name you want to save as in S3
        Body: fileContent,
        ContentType: "application/json",
      })
      const result = await s3.send(command)
      console.log("Uploaded to S3", { result })
      return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 })
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 })
  }
}
