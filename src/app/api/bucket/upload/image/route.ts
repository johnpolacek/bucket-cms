import { NextApiRequest, NextApiResponse } from "next"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed")
  }

  const file = req.body.image
  const fileName = `${Date.now()}-${file.name}` // To ensure uniqueness

  try {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `images/${fileName}`,
      Body: file,
      ContentType: file.type,
      ACL: "public-read", // To allow public access to the uploaded image
    })

    await s3.send(command)

    // Return the public URL of the uploaded image
    const imageURL = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/images/${fileName}`
    res.status(200).json({ url: imageURL })
  } catch (error) {
    console.error("Error uploading image:", error)
    res.status(500).json({ error: "Failed to upload image" })
  }
}
