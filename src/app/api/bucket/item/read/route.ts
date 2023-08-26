import { NextRequest, NextResponse } from "next/server"
import { GetObjectCommand } from "@aws-sdk/client-s3"
import { Readable } from "stream"
import { initializeS3Client } from "../../s3/util"

export async function GET(req: NextRequest) {
  const s3 = initializeS3Client()

  // Extracting collectionName and itemId from the query parameters
  const collectionName = req.nextUrl.searchParams.get("collectionName")
  const itemId = req.nextUrl.searchParams.get("itemId")

  if (!collectionName || !itemId) {
    return NextResponse.json({ error: "Both collection name and item ID are required as query parameters" }, { status: 400 })
  }

  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `items/${collectionName}/${itemId}.json`,
    })

    const { Body } = await s3.send(command)

    if (Body instanceof Readable) {
      const data = await new Promise<string>((resolve, reject) => {
        const chunks: any[] = []
        Body.on("data", (chunk) => chunks.push(chunk))
        Body.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")))
        Body.on("error", reject)
      })

      const jsonData = JSON.parse(data)
      return NextResponse.json(jsonData, { status: 200 })
    }

    return NextResponse.json({ error: "Failed to retrieve item data" }, { status: 500 })
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "NoSuchKey") {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    } else {
      return NextResponse.json({ error: `Failed to retrieve item: ${String(error)}` }, { status: 500 })
    }
  }
}
