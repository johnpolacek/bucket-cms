import { NextRequest, NextResponse } from "next/server"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
})

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get("image")
  if (!file) {
    return NextResponse.json({ error: "Image file not provided" }, { status: 400 })
  }

  if (!(file instanceof Blob)) {
    return NextResponse.json({ error: "Bad file type" }, { status: 400 })
  }
  const fileName = `${Date.now()}-${file.name}` // To ensure uniqueness

  try {
    console.log("Reading entire file...")
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `images/${fileName}`,
      Body: buffer, // Use the Buffer here
      ContentType: file.type,
      ACL: "public-read",
    })

    console.log("Uploading to S3...")
    await s3.send(command)

    const imageURL = `https://s3.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_S3_BUCKET_NAME}/images/${fileName}`
    return NextResponse.json({ success: true, url: imageURL }, { status: 200 })
  } catch (error) {
    console.error("Error uploading image:", error)
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
  }
}
