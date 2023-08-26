import { NextRequest, NextResponse } from "next/server"
import { initializeS3Client } from "../../s3/util"
import { PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3"
import { Collection, ComponentData } from "@/app/components/bucket/types"

export async function POST(req: NextRequest) {
  const s3 = initializeS3Client()

  if (req.method === "POST") {
    try {
      const data: Collection<ComponentData> = await req.json()

      // Validation: Check if collectionName is empty
      if (!data.name.trim()) {
        return NextResponse.json({ error: "Collection name cannot be empty" }, { status: 400 })
      }

      // Validation: Ensure data adheres to Collection type (basic checks)
      if (typeof data.name !== "string" || !Array.isArray(data.layout)) {
        return NextResponse.json({ error: "Data is not formatted properly" }, { status: 400 })
      }

      const collectionName = data.name

      // Check if the file already exists
      const headCommand = new HeadObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `collections/${collectionName}.json`,
      })

      try {
        await s3.send(headCommand)
        // If we get to this line without an error, it means the collection already exists
        return NextResponse.json({ error: "A collection with this name already exists" }, { status: 409 })
      } catch (error) {
        // error is expected
      }

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
      return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 })
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 })
  }
}
