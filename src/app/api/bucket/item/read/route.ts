import { NextRequest, NextResponse } from "next/server"
import { initializeS3Client, readCollectionItem } from "../../s3/util"
import { CollectionItemData } from "../../../../bucket/src/types"

export async function GET(req: NextRequest) {
  const s3 = initializeS3Client()

  // Extracting collectionName and itemId from the query parameters
  const collectionName = req.nextUrl.searchParams.get("collectionName")
  const itemId = req.nextUrl.searchParams.get("itemId")

  if (!collectionName || !itemId) {
    return NextResponse.json({ error: "Both collectionName and itemId are required as query parameters" }, { status: 400 })
  }

  try {
    const itemData: CollectionItemData = await readCollectionItem(collectionName, itemId)
    return NextResponse.json(itemData, { status: 200 })
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "NoSuchKey") {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    } else {
      return NextResponse.json({ error: `Failed to retrieve item: ${String(error)}` }, { status: 500 })
    }
  }
}
