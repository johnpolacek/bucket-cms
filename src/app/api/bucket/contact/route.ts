import { NextRequest, NextResponse } from "next/server"
import { initializeS3Client, getBucketName } from "../s3/util"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import slugify from "slugify"

interface ContactData {
  name: string
  email: string
  message: string
}

export async function POST(req: NextRequest) {
  const s3 = initializeS3Client()

  if (req.method === "POST") {
    try {
      const data: ContactData = await req.json()

      if (!data.name || !data.email || !data.message) {
        return NextResponse.json({ error: "All fields are required." }, { status: 400 })
      }

      const contactId = `${new Date().toISOString()}-${slugify(data.email)}`
      const bucketName = await getBucketName(true)

      const fileContent = JSON.stringify(data)

      // Upload to S3
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: `contact/${contactId}.json`, // File name you want to save as in S3
        Body: fileContent,
        ContentType: "application/json",
      })
      const result = await s3.send(command)
      return NextResponse.json({ success: true }, { status: 200 })
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 }) // sending only the error message for better clarity
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 })
  }
}
