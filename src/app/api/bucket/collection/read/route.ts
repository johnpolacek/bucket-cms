import { NextRequest, NextResponse } from "next/server"
import { GetObjectCommand } from "@aws-sdk/client-s3"
import { Readable } from "stream"
import { initializeS3Client } from "../../s3/util"
import { Collection, ComponentData } from "@/app/components/bucket/types"

export async function GET(req: NextRequest) {
  const s3 = initializeS3Client()

  // Extracting collectionName from the query parameters
  const collectionName = req.nextUrl.searchParams.get("collectionName")

  if (!collectionName) {
    return NextResponse.json({ error: "Collection name is required as a query parameter" }, { status: 400 })
  }

  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `collections/${collectionName}.json`,
    })

    const { Body } = await s3.send(command)

    if (Body instanceof Readable) {
      const data = await new Promise<string>((resolve, reject) => {
        const chunks: any[] = []
        Body.on("data", (chunk) => chunks.push(chunk))
        Body.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")))
        Body.on("error", reject)
      })

      const jsonData: Collection = JSON.parse(data)
      return NextResponse.json(jsonData, { status: 200 })
    }

    return NextResponse.json({ error: "Failed to retrieve collection data" }, { status: 500 })
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "NoSuchKey") {
      return NextResponse.json({ error: "Collection not found" }, { status: 404 })
    } else {
      return NextResponse.json({ error: `Failed to retrieve collection: ${String(error)}` }, { status: 500 })
    }
  }
}
