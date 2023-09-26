import { NextRequest, NextResponse } from "next/server"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { ALLOWED_MIME_TYPES } from "../../s3/allowed-mime-types"
import { initializeS3Client, getBucketName } from "../../s3/util"
import { checkPublicUploadAccess } from "@/app/bucket/src/util"

const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20 MB

export async function POST(req: NextRequest) {
  const s3 = initializeS3Client()

  const formData = await req.formData()
  const file = formData.get("file")

  const { error, response } = await checkPublicUploadAccess()
  if (error) {
    return response
  }

  if (!file) {
    return NextResponse.json({ error: "File not provided" }, { status: 400 })
  }

  if (!(file instanceof Blob)) {
    return NextResponse.json({ error: "Bad file type" }, { status: 400 })
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "File size exceeds the maximum limit" }, { status: 400 })
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Unsupported file type" }, { status: 400 })
  }

  const fileName = `${Date.now()}-${file.name}` // To ensure uniqueness

  try {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const bucketName = await getBucketName(true)

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: `files/${fileName}`,
      Body: buffer,
      ContentType: file.type,
      ACL: "public-read",
    })

    console.log("Uploading to S3...")
    await s3.send(command)

    const fileURL = `https://s3.${process.env.AWS_REGION}.amazonaws.com/${bucketName}/files/${fileName}`
    return NextResponse.json({ success: true, url: fileURL }, { status: 200 })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
