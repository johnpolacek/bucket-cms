import { NextRequest, NextResponse } from "next/server"
import { initializeS3Client, doesItemExist } from "../../s3/util"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import slugify from "slugify"

export async function POST(req: NextRequest) {
  const s3 = initializeS3Client()

  try {
    const { collectionName, itemName, data } = await req.json()

    // Validate the itemName
    if (!itemName || typeof itemName !== "string" || !itemName.trim()) {
      return NextResponse.json({ error: "Item name is required and should be a non-empty string." }, { status: 400 })
    }

    // Generate the initial slug from the item name
    let slug = slugify(itemName, { lower: true, strict: true })

    // Check if an item with this slug already exists and modify the slug until it's unique
    let originalSlug = slug
    let counter = 1
    while (await doesItemExist(collectionName, slug)) {
      slug = `${originalSlug}-${counter}`
      counter++
    }

    const fileContent = JSON.stringify({ itemName, data })

    // Store the item with the slug as its name
    const itemKey = `items/${collectionName}/${slug}.json`
    const putCommand = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: itemKey,
      Body: fileContent,
      ContentType: "application/json",
    })
    await s3.send(putCommand)

    return NextResponse.json({ success: true, itemId: slug }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: `${error.message || "An error occurred"}` }, { status: 500 })
  }
}
