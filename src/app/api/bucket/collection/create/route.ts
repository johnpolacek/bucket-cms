import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { options } from "../../../../../app/bucket/options"
import { initializeS3Client, getBucketName } from "../../s3/util"
import { PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3"
import { Collection } from "../../../../bucket/src/types"

export async function POST(req: NextRequest) {
  const session = await getServerSession(options)
  if ((process.env.NODE_ENV !== "development" || process.env.USE_SANDBOX === "true") && !session?.user) {
    return NextResponse.json({ error: `Not Authorized` }, { status: 401 })
  }

  const s3 = initializeS3Client()

  if (req.method === "POST") {
    try {
      const data: Collection = await req.json()

      if (!data.name.trim()) {
        return NextResponse.json({ error: "Collection name cannot be empty" }, { status: 400 })
      }

      const collectionName = data.name
      const isPrivate = data.isPrivate

      // Check if the file already exists
      const bucketName = await getBucketName(isPrivate)
      const headCommand = new HeadObjectCommand({
        Bucket: bucketName,
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
        Bucket: bucketName,
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
