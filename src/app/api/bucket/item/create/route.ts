import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { options } from "../../../../../app/bucket/options"
import { initializeS3Client, getBucketName } from "../../s3/util"
import { doesItemExist } from "../../s3/operations"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import slugify from "slugify"

export async function POST(req: NextRequest) {
  const session = await getServerSession(options)
  if ((process.env.NODE_ENV !== "development" || process.env.USE_SANDBOX === "true") && !session?.user) {
    return NextResponse.json({ error: `Not Authorized` }, { status: 401 })
  }

  const s3 = initializeS3Client()

  try {
    const { itemName, collectionName, data } = await req.json()

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

    const fileContent = JSON.stringify({ data, itemName })

    // Store the item with the slug as its name
    const bucketName = await getBucketName()
    const itemKey = `items/${collectionName}/${slug}.json`
    const putCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: itemKey,
      Body: fileContent,
      ContentType: "application/json",
    })
    await s3.send(putCommand)

    return NextResponse.json({ success: true, itemId: slug }, { status: 200 })
  } catch (error: any) {
    console.log({ error })
    return NextResponse.json({ error: `${error.message || "An error occurred"}` }, { status: 500 })
  }
}
