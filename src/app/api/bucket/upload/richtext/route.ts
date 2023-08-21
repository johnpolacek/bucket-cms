// /api/bucket/upload/richtext.ts

import { NextApiRequest, NextApiResponse } from "next"
import { initializeS3Client } from "../../s3/util"
import { PutObjectCommand } from "@aws-sdk/client-s3"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const s3 = initializeS3Client()

  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed")
  }

  const content = req.body.content
  const contentName = `${Date.now()}.json` // Storing as JSON, but you can use .txt or other formats if preferred

  try {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `richtext/${contentName}`,
      Body: JSON.stringify(content),
      ContentType: "application/json",
    })

    await s3.send(command)

    // Return success message
    res.status(200).json({ success: true })
  } catch (error) {
    console.error("Error saving rich text:", error)
    res.status(500).json({ error: "Failed to save rich text content" })
  }
}
