import { NextRequest, NextResponse } from "next/server"
import { initializeS3Client } from "../../s3/util"
import { PutObjectCommand } from "@aws-sdk/client-s3"

export async function PUT(req: NextRequest) {
  const s3 = initializeS3Client()

  if (req.method === "PUT") {
    try {
      const { collectionName, itemName, data, itemId } = await req.json()

      // Validate the itemName
      if (!itemName || typeof itemName !== "string" || !itemName.trim()) {
        return NextResponse.json({ error: "Item name is required and should be a non-empty string." }, { status: 400 })
      }

      // Validate itemId
      if (!itemId || typeof itemId !== "string" || !itemId.trim()) {
        return NextResponse.json({ error: "Item ID is required for updating." }, { status: 400 })
      }

      // Define the path where the item will be stored
      const itemPath = `items/${collectionName}/${itemId}.json`

      // Convert the data to a JSON string
      const fileContent = JSON.stringify({ itemName, data })

      // Upload the updated JSON string to S3
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: itemPath,
        Body: fileContent,
        ContentType: "application/json",
      })

      const result = await s3.send(command)

      return NextResponse.json({ success: true, itemId: itemId }, { status: 200 })
    } catch (error: any) {
      return NextResponse.json({ error: `${error.message || "An error occurred"}` }, { status: 500 })
    }
  } else {
    return NextResponse.json({ error: `Method Not Allowed` }, { status: 405 })
  }
}
